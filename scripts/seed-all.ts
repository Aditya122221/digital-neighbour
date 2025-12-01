import dotenv from "dotenv"
import { resolve } from "path"
import { createClient, type SanityClient } from "@sanity/client"
import * as fs from "fs"
import * as path from "path"

// Import all data files
import homeData from "../data/home.json"
import seoData from "../data/seo.json"
import paidAdsData from "../data/paid-ads.json"
import socialMediaData from "../data/social-media.json"
import contentMarketingData from "../data/content-marketing.json"
import webDevelopmentData from "../data/web-development.json"
import appDevelopmentData from "../data/app-development.json"
import hostingItSecurityData from "../data/hosting-it-security.json"
import aiAutomationData from "../data/ai-automation.json"
import dataAnalyticsData from "../data/data-analytics.json"
import industriesData from "../data/industries.json"
import professionalsMarketingData from "../data/professionals-marketing.json"
import portfolioData from "../data/portfolio.json"
import resourcesData from "../data/resources.json"
import aboutData from "../data/about.json"
import apartData from "../data/apart.json"
import caseData from "../data/case.json"
import marketingAgencyData from "../data/marketing-agency.json"

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), ".env.local") })
dotenv.config({ path: resolve(process.cwd(), ".env") })

/**
 * Get or create Sanity client instance
 */
function getClient(): SanityClient {
	const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
	const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
	const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-10-01"
	const writeToken =
		process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN

	if (!projectId) {
		throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required")
	}

	return createClient({
		projectId,
		dataset,
		apiVersion,
		useCdn: false,
		token: writeToken,
	})
}

/**
 * Upload an image from local file path to Sanity
 */
async function uploadImageFromPath(
	client: SanityClient,
	imagePath: string,
	description?: string
): Promise<any> {
	if (!imagePath) {
		return undefined
	}

	const normalizedPath = imagePath.startsWith("/")
		? imagePath.slice(1)
		: imagePath

	const fullPath = path.join(process.cwd(), "public", normalizedPath)

	if (!fs.existsSync(fullPath)) {
		console.log(`⚠️  Image not found: ${imagePath} (looked at: ${fullPath})`)
		return undefined
	}

	try {
		const buffer = fs.readFileSync(fullPath)
		const filename = path.basename(fullPath)

		const asset = await client.assets.upload("image", buffer, {
			filename: filename,
			contentType: getContentType(fullPath),
		})

		console.log(`✅ Uploaded image: ${filename}`)

		return {
			_type: "image",
			asset: {
				_type: "reference",
				_ref: asset._id,
			},
			...(description && { alt: description }),
		}
	} catch (error) {
		console.error(`❌ Error uploading image ${fullPath}:`, error)
		return undefined
	}
}

/**
 * Get content type based on file extension
 */
function getContentType(filePath: string): string {
	const ext = path.extname(filePath).toLowerCase()
	const contentTypes: Record<string, string> = {
		".jpg": "image/jpeg",
		".jpeg": "image/jpeg",
		".png": "image/png",
		".webp": "image/webp",
		".gif": "image/gif",
		".svg": "image/svg+xml",
		".avif": "image/avif",
	}
	return contentTypes[ext] || "image/jpeg"
}

/**
 * Convert slug string to slug object format for Sanity
 */
function createSlug(slugValue: string) {
	return {
		_type: "slug",
		current: slugValue,
	}
}

/**
 * Transform service card data and upload images
 */
async function transformServiceCards(client: SanityClient, serviceCards: any[]) {
	if (!Array.isArray(serviceCards)) {
		return []
	}

	const transformed = []
	for (const card of serviceCards) {
		const imageRef =
			card.image && typeof card.image === "string"
				? await uploadImageFromPath(client, card.image)
				: undefined

		transformed.push({
			id: card.id || "",
			name: card.name || "",
			title: card.title || "",
			description: card.description || "",
			...(imageRef && { image: imageRef }),
			...(card.link && { link: card.link }),
		})
	}
	return transformed
}

/**
 * Seed SEO Pages
 */
async function seedSeoPages(client: SanityClient) {
	console.log("\n🌱 Seeding SEO Pages...")
	const seoDataObj = seoData as Record<string, any>
	const slugs = Object.keys(seoDataObj).filter(
		(key) => key !== "otherServices"
	)

	let successCount = 0
	let errorCount = 0

	for (const slug of slugs) {
		try {
			const pageData = seoDataObj[slug]

			let contentImagePath = undefined
			if (pageData.content?.image && typeof pageData.content.image === "string") {
				contentImagePath = pageData.content.image.startsWith("/")
					? pageData.content.image
					: `/seo/content/${pageData.content.image}`
			}
			const contentImageRef = contentImagePath
				? await uploadImageFromPath(
					client,
					contentImagePath,
					pageData.content.alt || "SEO Content"
				)
				: undefined

			const serviceCards = await transformServiceCards(
				client,
				pageData.serviceCards || []
			)

			const document = {
				_type: "seoPage",
				_id: `seoPage-${slug}`,
				slug: createSlug(slug),
				serviceName: pageData.services || "SEO Service",
				hero: {
					heading: pageData.hero?.heading || "",
					subheading: pageData.hero?.subheading || "",
				},
				...(pageData.form && {
					form: {
						heading: pageData.form.heading || "",
						content: pageData.form.content || "",
						subContent: pageData.form.subContent || "",
						cta: pageData.form.cta || "",
						formHeading: pageData.form.formHeading || "",
						buttonText: pageData.form.buttonText || "",
					},
				}),
				...(pageData.introParagraph && {
					introParagraph: {
						heading: pageData.introParagraph.heading || "",
						problemStatement: pageData.introParagraph.problemStatement || "",
						valueProposition: pageData.introParagraph.valueProposition || "",
					},
				}),
				...(pageData.painPoints && {
					painPoints: {
						heading: pageData.painPoints.heading || "",
						subheading: pageData.painPoints.subheading || "",
						painPoints:
							pageData.painPoints.painPoints?.map((pp: any) => ({
								problem: pp.problem || "",
								solution: pp.solution || "",
							})) || [],
					},
				}),
				services: {
					serviceName: pageData.services || "",
					serviceCards: serviceCards,
				},
				...(pageData.content && {
					content: {
						heading: pageData.content.heading || "",
						text1: pageData.content.text1 || "",
						text2: pageData.content.text2 || "",
						text3: pageData.content.text3 || "",
						...(contentImageRef && { image: contentImageRef }),
						alt: pageData.content.alt || "",
					},
				}),
				...(pageData.process && {
					process: {
						steps: pageData.process.steps || [],
						content: pageData.process.content || [],
					},
				}),
				...(pageData.keyBenefits && {
					keyBenefits: {
						heading: pageData.keyBenefits.heading || "",
						subheading: pageData.keyBenefits.subheading || "",
						benefits:
							pageData.keyBenefits.benefits?.map((b: any) => ({
								title: b.title || "",
								description: b.description || "",
							})) || [],
					},
				}),
				...(pageData.features && {
					features: {
						heading: pageData.features.heading || "",
						subheading: pageData.features.subheading || "",
						features:
							pageData.features.features?.map((f: any) => ({
								title: f.title || "",
								description: f.description || "",
								icon: f.icon || "",
							})) || [],
					},
				}),
				...(pageData.faq && {
					faq: {
						serviceName: pageData.faq.serviceName || "",
						heading: pageData.faq.heading || "",
						subheading: pageData.faq.subheading || "",
						faqs:
							pageData.faq.faqs?.map((faq: any) => ({
								q: faq.q || "",
								a: faq.a || "",
							})) || [],
					},
				}),
			}

			await client.createOrReplace(document)
			console.log(`✅ Seeded SEO page: ${slug}`)
			successCount++
		} catch (error: any) {
			console.error(`❌ Error seeding SEO page ${slug}:`, error.message)
			errorCount++
		}
	}

	console.log(
		`✅ SEO Pages: ${successCount} succeeded, ${errorCount} failed\n`
	)
}

/**
 * Seed Paid Ads Pages
 */
async function seedPaidAdsPages(client: SanityClient) {
	console.log("🌱 Seeding Paid Ads Pages...")
	const paidAdsDataObj = paidAdsData as Record<string, any>
	const slugs = Object.keys(paidAdsDataObj).filter(
		(key) => key !== "otherServices"
	)

	let successCount = 0
	let errorCount = 0

	for (const slug of slugs) {
		try {
			const pageData = paidAdsDataObj[slug]

			const serviceCards = await transformServiceCards(
				client,
				pageData.serviceCards || []
			)

			const document = {
				_type: "paidAdsPage",
				_id: `paidAdsPage-${slug}`,
				slug: createSlug(slug),
				serviceName: pageData.services || "Paid Advertising",
				hero: {
					heading: pageData.hero?.heading || "",
					subheading: pageData.hero?.subheading || "",
				},
				...(pageData.form && {
					form: {
						heading: pageData.form.heading || "",
						content: pageData.form.content || "",
						subContent: pageData.form.subContent || "",
						cta: pageData.form.cta || "",
						formHeading: pageData.form.formHeading || "",
						buttonText: pageData.form.buttonText || "",
					},
				}),
				services: pageData.services || "",
				serviceCards: serviceCards,
				...(pageData.process && {
					process: {
						steps: pageData.process.steps || [],
						content: pageData.process.content || [],
					},
				}),
				...(pageData.strategic && {
					strategic: {
						heading: pageData.strategic.heading || "",
						blocks:
							pageData.strategic.blocks?.map((b: any) => ({
								icon: b.icon || "",
								title: b.title || "",
								description: b.description || "",
							})) || [],
					},
				}),
				...(pageData.introParagraph && {
					introParagraph: {
						heading: pageData.introParagraph.heading || "",
						problemStatement: pageData.introParagraph.problemStatement || "",
						valueProposition: pageData.introParagraph.valueProposition || "",
					},
				}),
				...(pageData.painPoints && {
					painPoints: {
						heading: pageData.painPoints.heading || "",
						subheading: pageData.painPoints.subheading || "",
						painPoints:
							pageData.painPoints.painPoints?.map((pp: any) => ({
								problem: pp.problem || "",
								solution: pp.solution || "",
							})) || [],
					},
				}),
				...(pageData.keyBenefits && {
					keyBenefits: {
						heading: pageData.keyBenefits.heading || "",
						subheading: pageData.keyBenefits.subheading || "",
						benefits:
							pageData.keyBenefits.benefits?.map((b: any) => ({
								title: b.title || "",
								description: b.description || "",
							})) || [],
					},
				}),
				...(pageData.features && {
					features: {
						heading: pageData.features.heading || "",
						subheading: pageData.features.subheading || "",
						features:
							pageData.features.features?.map((f: any) => ({
								title: f.title || "",
								description: f.description || "",
							})) || [],
					},
				}),
				...(pageData.content && {
					content: {
						heading: pageData.content.heading || "",
						text1: pageData.content.text1 || "",
						text2: pageData.content.text2 || "",
						text3: pageData.content.text3 || "",
					},
				}),
				...(pageData.faq && {
					faq: {
						serviceName: pageData.faq.serviceName || "",
						faqs:
							pageData.faq.faqs?.map((faq: any) => ({
								q: faq.q || "",
								a: faq.a || "",
							})) || [],
					},
				}),
			}

			await client.createOrReplace(document)
			console.log(`✅ Seeded Paid Ads page: ${slug}`)
			successCount++
		} catch (error: any) {
			console.error(`❌ Error seeding Paid Ads page ${slug}:`, error.message)
			errorCount++
		}
	}

	console.log(
		`✅ Paid Ads Pages: ${successCount} succeeded, ${errorCount} failed\n`
	)
}

/**
 * Seed Home Page Sections
 */
async function seedHomePageSections(client: SanityClient) {
	console.log("🌱 Seeding Home Page Sections...")

	try {
		// Home Page SEO
		if (homeData.metadata || homeData.description) {
			await client.createOrReplace({
				_type: "homePageSeo",
				_id: "homePageSeoSettings",
				metadata: homeData.metadata || "",
				description: homeData.description || "",
			})
			console.log("✅ Seeded homePageSeo")
		}

		// Home Hero
		if (homeData.hero) {
			const heroImages = []
			if (homeData.hero.images) {
				for (const [key, imagePath] of Object.entries(
					homeData.hero.images
				)) {
					const imageRef = await uploadImageFromPath(
						client,
						imagePath as string
					)
					if (imageRef) {
						heroImages.push(imageRef)
					}
				}
			}

			await client.createOrReplace({
				_type: "homeHero",
				_id: "homeHero",
				heading: homeData.hero.heading || "",
				subheading: homeData.hero.subheading || "",
				images: heroImages,
			})
			console.log("✅ Seeded homeHero")
		}

		// Home Brand Info
		if (homeData.brandInfo) {
			await client.createOrReplace({
				_type: "homeBrandInfo",
				_id: "homeBrandInfo",
				main: {
					heading: homeData.brandInfo.main?.heading || "",
					subheading: homeData.brandInfo.main?.subheading || "",
				},
				differentiators:
					homeData.brandInfo.differentiators?.map((d: any) => ({
						id: d.id?.toString() || "",
						title: d.title || "",
						description: d.description || "",
						icon: d.icon || "",
					})) || [],
				rightCard: {
					heading: homeData.brandInfo.rightCard?.heading || "",
					description: homeData.brandInfo.rightCard?.description || "",
					stats:
						homeData.brandInfo.rightCard?.stats?.map((s: any) => ({
							id: s.id || "",
							value: s.value || "",
							label: s.label || "",
						})) || [],
				},
			})
			console.log("✅ Seeded homeBrandInfo")
		}

		// Home Services
		if (homeData.services) {
			await client.createOrReplace({
				_type: "homeServices",
				_id: "homeServices",
				heading: homeData.services.heading || "",
				subheading: homeData.services.subheading || "",
				cards:
					homeData.services.rightCard?.map((card: any) => ({
						title: card.title || "",
						subheading: card.subheading || [],
					})) || [],
			})
			console.log("✅ Seeded homeServices")
		}

		// Home Apart
		if (apartData) {
			await client.createOrReplace({
				_type: "homeApart",
				_id: "homeApart",
				heading: "What sets us apart from others",
				tagline: "We don't settle for average, and neither should you.",
				oursTitle: "Digital Neighbour",
				othersTitle: "Other Agencies",
				ours: apartData.ours || [],
				others: apartData.others || [],
			})
			console.log("✅ Seeded homeApart")
		}

		// Home Case Study
		if (caseData && Array.isArray(caseData)) {
			const caseStudies = []
			for (const caseStudy of caseData) {
				// Note: bgImages are URLs, not local files, so we'll skip uploading them
				// If you need to upload them, you'd need to download them first
				caseStudies.push({
					title: caseStudy.title || "",
					textColor: caseStudy.textColor || "text-blackbrown",
					// bgImages would need special handling for URLs
					metrics:
						caseStudy.metrics?.map((m: any) => ({
							number: m.number || "",
							text: m.text || "",
						})) || [],
					services: caseStudy.services || [],
					isNew: caseStudy.isNew || false,
				})
			}

			await client.createOrReplace({
				_type: "homeCaseStudy",
				_id: "homeCaseStudy",
				heading: "Latest work",
				caseStudies: caseStudies,
			})
			console.log("✅ Seeded homeCaseStudy")
		}

		// Add other home sections as needed...
		console.log("✅ Home Page Sections seeded\n")
	} catch (error: any) {
		console.error(`❌ Error seeding home page sections:`, error.message)
	}
}

/**
 * Seed Portfolio Sections
 */
async function seedPortfolioSections(client: SanityClient) {
	console.log("🌱 Seeding Portfolio Sections...")

	try {
		// Portfolio Hero
		if (portfolioData.hero) {
			await client.createOrReplace({
				_type: "portfolioHero",
				_id: "portfolioHero",
				label: portfolioData.hero.label || "",
				title: portfolioData.hero.title || "",
				description: portfolioData.hero.description || "",
			})
			console.log("✅ Seeded portfolioHero")
		}

		// Portfolio Projects
		if (portfolioData.projects) {
			const projects = []
			for (const project of portfolioData.projects) {
				const imageRef = await uploadImageFromPath(
					client,
					project.image,
					project.imageAlt
				)

				projects.push({
					slug: createSlug(project.slug),
					logoText: project.logoText || "",
					headline: project.headline || "",
					...(imageRef && { image: imageRef }),
					imageAlt: project.imageAlt || "",
					metrics:
						project.metrics?.map((m: any) => ({
							value: m.value || "",
							label: m.label || "",
						})) || [],
					tags: project.tags || [],
					content: project.content || "",
				})
			}

			await client.createOrReplace({
				_type: "portfolioProject",
				_id: "portfolioProject",
				projects: projects,
			})
			console.log("✅ Seeded portfolioProject")
		}

		console.log("✅ Portfolio Sections seeded\n")
	} catch (error: any) {
		console.error(`❌ Error seeding portfolio sections:`, error.message)
	}
}

/**
 * Seed About Sections
 */
async function seedAboutSections(client: SanityClient) {
	console.log("🌱 Seeding About Sections...")

	try {
		// About Hero
		if (aboutData.hero) {
			const heroImage = await uploadImageFromPath(
				client,
				aboutData.hero.image
			)

			await client.createOrReplace({
				_type: "aboutHero",
				_id: "aboutHero",
				title: aboutData.hero.title || "",
				description: aboutData.hero.description || "",
				...(heroImage && { image: heroImage }),
				wordsText: aboutData.hero.wordsText || "",
			})
			console.log("✅ Seeded aboutHero")
		}

		// About Origins
		if (aboutData.origins) {
			const originImages = []
			if (aboutData.origins.images) {
				for (const img of aboutData.origins.images) {
					const imageRef = await uploadImageFromPath(
						client,
						img.image,
						img.alt
					)
					if (imageRef) {
						originImages.push(imageRef)
					}
				}
			}

			await client.createOrReplace({
				_type: "aboutOrigins",
				_id: "aboutOrigins",
				title: aboutData.origins.title || "",
				description: aboutData.origins.description || "",
				images: originImages,
			})
			console.log("✅ Seeded aboutOrigins")
		}

		// About Values
		if (aboutData.values) {
			await client.createOrReplace({
				_type: "aboutValues",
				_id: "aboutValues",
				title: aboutData.values.title || "",
				items:
					aboutData.values.items?.map((item: any) => ({
						title: item.title || "",
						description: item.description || "",
					})) || [],
			})
			console.log("✅ Seeded aboutValues")
		}

		// About Achievements
		if (aboutData.achievements) {
			await client.createOrReplace({
				_type: "aboutAchievements",
				_id: "aboutAchievements",
				title: aboutData.achievements.title || "",
				description: aboutData.achievements.description || "",
				stats:
					aboutData.achievements.stats?.map((stat: any) => ({
						number: stat.number || "",
						label: stat.label || "",
					})) || [],
			})
			console.log("✅ Seeded aboutAchievements")
		}

		// About Team
		if (aboutData.achievements?.team) {
			await client.createOrReplace({
				_type: "aboutTeam",
				_id: "aboutTeam",
				title: aboutData.achievements.team.title || "",
				description: aboutData.achievements.team.description || "",
			})
			console.log("✅ Seeded aboutTeam")
		}

		console.log("✅ About Sections seeded\n")
	} catch (error: any) {
		console.error(`❌ Error seeding about sections:`, error.message)
	}
}

/**
 * Seed Resources Sections
 */
async function seedResourcesSections(client: SanityClient) {
	console.log("🌱 Seeding Resources Sections...")

	try {
		// Resources Hero
		if (resourcesData.hero) {
			await client.createOrReplace({
				_type: "resourcesHero",
				_id: "resourcesHero",
				title: resourcesData.hero.title || "",
				description: resourcesData.hero.description || "",
			})
			console.log("✅ Seeded resourcesHero")
		}

		// Resources Articles
		if (resourcesData.articles) {
			const articles = []
			for (const article of resourcesData.articles) {
				const imageRef = await uploadImageFromPath(
					client,
					article.image
				)

				articles.push({
					slug: createSlug(article.slug),
					title: article.title || "",
					category: article.category || "",
					date: article.date || "",
					excerpt: article.excerpt || "",
					...(imageRef && { image: imageRef }),
					content: article.content || "",
				})
			}

			await client.createOrReplace({
				_type: "resourcesArticles",
				_id: "resourcesArticles",
				articles: articles,
			})
			console.log("✅ Seeded resourcesArticles")
		}

		console.log("✅ Resources Sections seeded\n")
	} catch (error: any) {
		console.error(`❌ Error seeding resources sections:`, error.message)
	}
}

/**
 * Seed other service pages (similar structure to SEO pages)
 */
async function seedServicePages(
	client: SanityClient,
	type: string,
	data: any,
	pageType: string
) {
	console.log(`🌱 Seeding ${type} Pages...`)
	const dataObj = data as Record<string, any>
	const slugs = Object.keys(dataObj).filter(
		(key) => key !== "otherServices"
	)

	let successCount = 0
	let errorCount = 0

	for (const slug of slugs) {
		try {
			const pageData = dataObj[slug]

			const serviceCards = await transformServiceCards(
				client,
				pageData.serviceCards || []
			)

			const document: any = {
				_type: pageType,
				_id: `${pageType}-${slug}`,
				slug: createSlug(slug),
				serviceName: pageData.services || type,
				hero: {
					heading: pageData.hero?.heading || "",
					subheading: pageData.hero?.subheading || "",
				},
				...(pageData.form && {
					form: {
						heading: pageData.form.heading || "",
						content: pageData.form.content || "",
						subContent: pageData.form.subContent || "",
						cta: pageData.form.cta || "",
						formHeading: pageData.form.formHeading || "",
						buttonText: pageData.form.buttonText || "",
					},
				}),
				services: pageData.services || "",
				serviceCards: serviceCards,
			}

			// Add optional sections
			if (pageData.process) {
				document.process = {
					steps: pageData.process.steps || [],
					content: pageData.process.content || [],
				}
			}

			if (pageData.introParagraph) {
				document.introParagraph = {
					heading: pageData.introParagraph.heading || "",
					problemStatement: pageData.introParagraph.problemStatement || "",
					valueProposition: pageData.introParagraph.valueProposition || "",
				}
			}

			if (pageData.painPoints) {
				document.painPoints = {
					heading: pageData.painPoints.heading || "",
					subheading: pageData.painPoints.subheading || "",
					painPoints:
						pageData.painPoints.painPoints?.map((pp: any) => ({
							problem: pp.problem || "",
							solution: pp.solution || "",
						})) || [],
				}
			}

			if (pageData.keyBenefits) {
				document.keyBenefits = {
					heading: pageData.keyBenefits.heading || "",
					subheading: pageData.keyBenefits.subheading || "",
					benefits:
						pageData.keyBenefits.benefits?.map((b: any) => ({
							title: b.title || "",
							description: b.description || "",
						})) || [],
				}
			}

			if (pageData.features) {
				document.features = {
					heading: pageData.features.heading || "",
					subheading: pageData.features.subheading || "",
					features:
						pageData.features.features?.map((f: any) => ({
							title: f.title || "",
							description: f.description || "",
							icon: f.icon || "",
						})) || [],
				}
			}

			if (pageData.content) {
				document.content = {
					heading: pageData.content.heading || "",
					text1: pageData.content.text1 || "",
					text2: pageData.content.text2 || "",
					text3: pageData.content.text3 || "",
				}
			}

			if (pageData.faq) {
				document.faq = {
					serviceName: pageData.faq.serviceName || "",
					heading: pageData.faq.heading || "",
					subheading: pageData.faq.subheading || "",
					faqs:
						pageData.faq.faqs?.map((faq: any) => ({
							q: faq.q || "",
							a: faq.a || "",
						})) || [],
				}
			}

			await client.createOrReplace(document)
			console.log(`✅ Seeded ${type} page: ${slug}`)
			successCount++
		} catch (error: any) {
			console.error(`❌ Error seeding ${type} page ${slug}:`, error.message)
			errorCount++
		}
	}

	console.log(
		`✅ ${type} Pages: ${successCount} succeeded, ${errorCount} failed\n`
	)
}

/**
 * Upload icon image and return reference
 */
async function uploadIconImage(
	client: SanityClient,
	iconPath: string
): Promise<any> {
	if (!iconPath) return undefined

	const normalizedPath = iconPath.startsWith("/")
		? iconPath.slice(1)
		: iconPath

	const fullPath = path.join(process.cwd(), "public", normalizedPath)

	if (!fs.existsSync(fullPath)) {
		return undefined
	}

	try {
		const buffer = fs.readFileSync(fullPath)
		const filename = path.basename(fullPath)

		const asset = await client.assets.upload("image", buffer, {
			filename: filename,
			contentType: getContentType(fullPath),
		})

		return {
			_type: "image",
			asset: {
				_type: "reference",
				_ref: asset._id,
			},
		}
	} catch (error) {
		return undefined
	}
}

/**
 * Seed Navbar Settings
 */
async function seedNavbarSettings(client: SanityClient) {
	console.log("🌱 Seeding Navbar Settings...")

	try {
		const logoRef = await uploadImageFromPath(
			client,
			"/main-logo.png",
			"Digital Neighbour Logo"
		)

		// Icon mapping for services
		const iconMapping: Record<string, string> = {
			"Search Engine Optimisation": "/navbar/black/seo.png",
			"Local SEO": "/navbar/black/local-seo.png",
			"WordPress SEO": "/navbar/black/wordpress-seo.png",
			"E-commerce SEO": "/navbar/black/ecom-seo.png",
			"AI SEO": "/navbar/black/ai-seo.png",
			"Google Ads": "/navbar/black/google-ads.png",
			"Google Remarketing": "/navbar/black/google-remarketing.png",
			"Google Shopping": "/navbar/black/google-shopping.png",
			"Paid Social": "/navbar/black/paid-social.png",
			"YouTube Ads": "/navbar/black/youtube-ads.png",
			"Facebook Marketing": "/navbar/black/fb.png",
			"X Marketing": "/navbar/black/x.png",
			"Instagram Marketing": "/navbar/black/instagram.png",
			"LinkedIn Marketing": "/navbar/black/linkedin.png",
			"TikTok Marketing": "/navbar/black/tik-tok.png",
			"Content Marketing": "/navbar/black/content-marketing.png",
			Copywriting: "/navbar/black/copywriting.png",
			"Graphic Designing": "/navbar/black/graphic-designing.png",
			"Video Editing": "/navbar/black/video-editing.png",
			"Photo Shoot": "/navbar/black/photoshoot.png",
			"Video Shoot": "/navbar/black/videoshoot.png",
			"Conversion Rate Optimisation":
				"/navbar/black/conversion-rate-optimization.png",
			"Call Tracking": "/navbar/black/call-tracking.png",
			"Reporting and Dashboards": "/navbar/black/reporting-and-dashboard.png",
			"Google Analytics": "/navbar/black/google-analytics.png",
			"Google Tag Manager": "/navbar/black/google-tag-manager.png",
			"E-commerce Web Development": "/navbar/black/app-development.png",
			"Front-End Development": "/navbar/black/frontend.png",
			"Back-End Development": "/navbar/black/backend.png",
			"CMS Integration": "/navbar/black/cms.png",
			"Custom Web Development": "/navbar/black/custom-web-development.png",
			"App Development": "/navbar/black/app-development.png",
			"Android App Development": "/navbar/black/android.png",
			"iOS App Development": "/navbar/black/ios.png",
			"Software Development": "/navbar/black/software.png",
			"Flutter App Development": "/navbar/black/flutter.png",
			"React Native Development": "/navbar/black/react-native.png",
			"Web Hosting": "/navbar/black/custom-web-development.png",
			"WordPress Hosting": "/navbar/black/cms.png",
			"Reseller Hosting": "/navbar/black/reseller-hosting.png",
			"Email Hosting": "/navbar/black/email-hosting.png",
			"AI Assistants Chatbots": "/navbar/black/chat.png",
			"AI-powered Voice Agents / Receptionists": "/navbar/black/ai-seo.png",
			"Factory Automation": "/navbar/black/factory.png",
			"Marketing & Social Media Automation": "/navbar/black/instagram.png",
			"Workflow Automation (Zapier, Make, Custom)": "/navbar/black/workflow.png",
			"ERP Systems": "/navbar/black/erp.png",
			"Car Removal & Wreckers Marketing Agency": "/navbar/black/car.png",
			"Automotive Repair & Servicing Marketing Agency":
				"/navbar/black/automotive.png",
			"Movers & Relocation Services Marketing Agency":
				"/navbar/black/relocate.png",
			"Plumbing Marketing Agency": "/navbar/black/plumbing.png",
			"Small Business Marketing Agency": "/navbar/black/small-bus.png",
			"Medium Business Marketing Agency": "/navbar/black/medium-bus.png",
			"Enterprise Business Marketing Agency": "/navbar/black/enterprise-bus.png",
			"Real Estate Marketing Agency": "/navbar/black/real-estate.png",
			"Mortgage Broker Marketing Agency": "/navbar/black/mortage-broker.png",
			"Physiotherapists Marketing Agency": "/navbar/black/physio.png",
			"Coaches Marketing Agency": "/navbar/black/coach.png",
			"Law Firm Marketing Agency": "/navbar/black/law.png",
		}

		// Helper function to create service with icon
		const createService = async (name: string, href: string, emoji: string) => {
			const iconPath = iconMapping[name]
			const iconRef = iconPath ? await uploadIconImage(client, iconPath) : undefined

			return {
				label: name,
				href: href,
				...(iconRef && { icon: iconRef }),
				...(emoji && !iconRef && { emoji: emoji }),
			}
		}

		// Marketing category services
		const marketingSeoServices = await Promise.all([
			createService("Search Engine Optimisation", "/seo", "📍"),
			createService("Local SEO", "/seo/local-seo", "📍"),
			createService("WordPress SEO", "/seo/wordpress-seo", "🔧"),
			createService("E-commerce SEO", "/seo/ecommerce-seo", "🛒"),
			createService("AI SEO", "/seo/ai-seo", "🤖"),
		])

		const marketingPaidAdsServices = await Promise.all([
			createService("Google Ads", "/paid-advertisement/google-ads", "📊"),
			createService(
				"Google Remarketing",
				"/paid-advertisement/google-remarketing",
				"🔄"
			),
			createService(
				"Google Shopping",
				"/paid-advertisement/google-shopping-ads",
				"🛍️"
			),
			createService("Paid Social", "/paid-advertisement/paid-social", "👥"),
			createService("YouTube Ads", "/paid-advertisement/youtube-ads", "📺"),
		])

		const marketingSocialServices = await Promise.all([
			createService(
				"Facebook Marketing",
				"/social-media-marketing/facebook-marketing",
				"📘"
			),
			createService("X Marketing", "/social-media-marketing/x-marketing", "🐦"),
			createService(
				"Instagram Marketing",
				"/social-media-marketing/instagram-marketing",
				"📷"
			),
			createService(
				"LinkedIn Marketing",
				"/social-media-marketing/linkedin-marketing",
				"💼"
			),
			createService(
				"TikTok Marketing",
				"/social-media-marketing/tiktok-marketing",
				"🎵"
			),
		])

		const marketingContentServices = await Promise.all([
			createService("Content Marketing", "/content-marketing", "📝"),
			createService("Copywriting", "/content-marketing/copywriting", "✍️"),
			createService(
				"Graphic Designing",
				"/content-marketing/graphic-designing",
				"🎨"
			),
			createService("Video Editing", "/content-marketing/video-editing", "🎬"),
			createService("Photo Shoot", "/content-marketing/photo-shoot", "📸"),
			createService("Video Shoot", "/content-marketing/video-shoot", "🎥"),
		])

		// Web & App Development category services
		const webDevServices = await Promise.all([
			createService(
				"E-commerce Development",
				"/web-development/ecommerce-development",
				"🛒"
			),
			createService(
				"Front-End Development",
				"/web-development/front-end-development",
				"🎨"
			),
			createService(
				"Back-End Development",
				"/web-development/back-end-development",
				"⚙️"
			),
			createService(
				"CMS Integration",
				"/web-development/cms-integration",
				"🔧"
			),
			createService(
				"Custom Web Development",
				"/web-development/custom-web-development",
				"💻"
			),
		])

		const appDevServices = await Promise.all([
			createService("App Development", "/app-development", "📱"),
			createService(
				"Android App Development",
				"/app-development/android-app-development",
				"🤖"
			),
			createService(
				"iOS App Development",
				"/app-development/ios-app-development",
				"🍎"
			),
			createService(
				"Software Development",
				"/app-development/software-development",
				"💻"
			),
			createService(
				"Flutter App Development",
				"/app-development/flutter-app-development",
				"🦋"
			),
			createService(
				"React Native Development",
				"/app-development/react-native-development",
				"⚛️"
			),
		])

		const hostingServices = await Promise.all([
			createService("Web Hosting", "/hosting-it-security/web-hosting", "🌐"),
			createService(
				"WordPress Hosting",
				"/hosting-it-security/wordpress-hosting",
				"📝"
			),
			createService(
				"Reseller Hosting",
				"/hosting-it-security/reseller-hosting",
				"🔄"
			),
			createService(
				"Email Hosting",
				"/hosting-it-security/email-hosting",
				"📧"
			),
		])

		// AI & Automation category services
		const aiAutomationServices = await Promise.all([
			createService(
				"AI Assistants Chatbots",
				"/ai-automation/ai-chatbots",
				"💬"
			),
			createService(
				"AI-powered Voice Agents / Receptionists",
				"/ai-automation/ai-receptionists",
				"🎤"
			),
			createService(
				"Factory Automation",
				"/ai-automation/factory-automation",
				"🏭"
			),
			createService(
				"Marketing & Social Media Automation",
				"/ai-automation/social-media-automation",
				"📱"
			),
			createService(
				"Workflow Automation (Zapier, Make, Custom)",
				"/ai-automation/workflow-automation",
				"⚙️"
			),
			createService("ERP Systems", "/ai-automation/erp-systems", "📊"),
		])

		const dataAnalyticsServices = await Promise.all([
			createService(
				"Conversion Rate Optimisation",
				"/data-analytics/conversion-rate-optimization",
				"📈"
			),
			createService("Call Tracking", "/data-analytics/call-tracking", "📞"),
			createService(
				"Reporting and Dashboards",
				"/data-analytics/reporting-and-dashboards",
				"📊"
			),
			createService(
				"Google Analytics",
				"/data-analytics/google-analytics",
				"📈"
			),
			createService(
				"Google Tag Manager",
				"/data-analytics/google-tag-manager",
				"🏷️"
			),
		])

		// Industries category services
		const industriesServices = await Promise.all([
			createService(
				"Car Removal & Wreckers Marketing Agency",
				"/industry/car-removal-wreckers-marketing-agency",
				"🚗"
			),
			createService(
				"Automotive Repair & Servicing Marketing Agency",
				"/industry/automotive-repair-servicing-marketing-agency",
				"🔧"
			),
			createService(
				"Movers & Relocation Services Marketing Agency",
				"/industry/movers-relocation-services-marketing-agency",
				"📦"
			),
			createService(
				"Plumbing Marketing Agency",
				"/industry/plumbing-marketing-agency",
				"🚿"
			),
			createService(
				"Small Business Marketing Agency",
				"/industry/small-business-marketing-agency",
				"🏪"
			),
			createService(
				"Medium Business Marketing Agency",
				"/industry/medium-business-marketing-agency",
				"🏢"
			),
			createService(
				"Enterprise Business Marketing Agency",
				"/industry/enterprise-business-marketing-agency",
				"🏭"
			),
		])

		const professionalsServices = await Promise.all([
			createService(
				"Real Estate Marketing Agency",
				"/professionals-marketing-agency/real-estate-marketing-agency",
				"🏠"
			),
			createService(
				"Mortgage Broker Marketing Agency",
				"/professionals-marketing-agency/mortgage-broker-marketing-agency",
				"💰"
			),
			createService(
				"Physiotherapists Marketing Agency",
				"/professionals-marketing-agency/physiotherapists-marketing-agency",
				"🏥"
			),
			createService(
				"Coaches Marketing Agency",
				"/professionals-marketing-agency/coaches-marketing-agency",
				"🎯"
			),
			createService(
				"Law Firm Marketing Agency",
				"/professionals-marketing-agency/law-firm-marketing-agency",
				"⚖️"
			),
		])

		await client.createOrReplace({
			_type: "siteNavbar",
			_id: "siteNavbar",
			...(logoRef && {
				logo: {
					...logoRef,
					href: "/",
				},
			}),
			ctaButton: {
				label: "Start a Project",
				href: "/contact",
				variant: "primary",
			},
			navigationLinks: [
				{
					label: "Home",
					href: "/",
					hasMegaMenu: false,
				},
				{
					label: "Services",
					href: "",
					hasMegaMenu: true,
					megaMenuCategoryKey: "Marketing",
				},
				{
					label: "Portfolio",
					href: "/portfolio",
					hasMegaMenu: false,
				},
				{
					label: "About Us",
					href: "/about",
					hasMegaMenu: false,
				},
				{
					label: "Resources",
					href: "/resources",
					hasMegaMenu: false,
				},
			],
			megaMenuCategories: [
				{
					key: "Marketing",
					title: "Marketing",
					isDefault: true,
					columns: [
						{
							title: "Search Engine Optimisation",
							href: "/seo",
							services: marketingSeoServices,
						},
						{
							title: "Paid Advertising",
							href: "/paid-advertisement",
							services: marketingPaidAdsServices,
						},
						{
							title: "Social Media Management",
							href: "/social-media-marketing",
							services: marketingSocialServices,
						},
						{
							title: "Content Marketing",
							href: "/content-marketing",
							services: marketingContentServices,
						},
					],
				},
				{
					key: "Web & App Development",
					title: "Web & App Development",
					isDefault: false,
					columns: [
						{
							title: "Web Development",
							href: "/web-development",
							services: webDevServices,
						},
						{
							title: "App Development",
							href: "/app-development",
							services: appDevServices,
						},
						{
							title: "Hosting, IT & Security",
							href: "/hosting-it-security",
							services: hostingServices,
						},
					],
				},
				{
					key: "AI & Automation",
					title: "AI & Automation",
					isDefault: false,
					columns: [
						{
							title: "AI & Automation",
							href: "/ai-automation",
							services: aiAutomationServices,
						},
						{
							title: "Data & Analytics",
							href: "/data-analytics",
							services: dataAnalyticsServices,
						},
					],
				},
				{
					key: "Industries",
					title: "Industries",
					isDefault: false,
					columns: [
						{
							title: "Industries",
							href: "/industry",
							services: industriesServices,
						},
						{
							title: "Professionals Marketing",
							href: "/professionals-marketing-agency",
							services: professionalsServices,
						},
					],
				},
			],
		})

		console.log("✅ Seeded Navbar Settings\n")
	} catch (error: any) {
		console.error("❌ Error seeding Navbar Settings:", error.message || error)
	}
}

/**
 * Seed Footer Settings
 */
async function seedFooterSettings(client: SanityClient) {
	console.log("🌱 Seeding Footer Settings...")

	try {
		await client.createOrReplace({
			_type: "siteFooter",
			_id: "siteFooter",
			heading: "Let's Scale Your Brand.",
			highlightedWord: "Scale",
			subheading:
				"Feel free to reach out if you want to collaborate with us, or simply have a chat",
			ctaButton: {
				label: "Start a Project",
				href: "/contact",
				variant: "primary",
			},
			companyLinks: [
				{
					label: "Home",
					href: "/",
				},
				{
					label: "Projects",
					href: "/portfolio",
				},
				{
					label: "About Us",
					href: "/about",
				},
				{
					label: "Blog",
					href: "/resources",
				},
				{
					label: "Contact Us",
					href: "/contact",
				},
				{
					label: "404",
					href: "#",
				},
			],
			socialLinks: [
				{
					label: "Instagram",
					href: "#",
					platform: "instagram",
				},
				{
					label: "Facebook",
					href: "#",
					platform: "facebook",
				},
				{
					label: "LinkedIn",
					href: "#",
					platform: "linkedin",
				},
				{
					label: "Behance",
					href: "#",
					platform: "behance",
				},
				{
					label: "X/Twitter",
					href: "#",
					platform: "twitter",
				},
			],
			contactInfo: {
				phone: "+1 234 456 789",
				email: "hello@dn.com",
			},
			legalLinks: [
				{
					label: "Privacy Policy",
					href: "#",
				},
				{
					label: "Terms of Service",
					href: "#",
				},
			],
		})

		console.log("✅ Seeded Footer Settings\n")
	} catch (error: any) {
		console.error("❌ Error seeding Footer Settings:", error.message || error)
	}
}

/**
 * Seed Marketing Agency Page
 */
async function seedMarketingAgencyPage(client: SanityClient) {
	console.log("🌱 Seeding Marketing Agency Page...")

	const marketingData = (
		marketingAgencyData as Record<string, any>
	)["marketing-agency"]

	if (!marketingData) {
		console.log(
			"⚠️ No marketing-agency key found in data/marketing-agency.json\n"
		)
		return
	}

	try {
		await client.createOrReplace({
			_type: "marketingAgencySettings",
			_id: "marketingAgencySettings",
			title:
				marketingData.title ||
				marketingData.hero?.heading ||
				"Marketing Agency",
			metadata: marketingData.metadata || "",
			description: marketingData.description || "",
			serviceLabel: marketingData.services || "Marketing Agency",
		})

		await client.createOrReplace({
			_type: "marketingAgencyHero",
			_id: "marketingAgencyHero",
			heading: marketingData.hero?.heading || "",
			subheading: marketingData.hero?.subheading || "",
			ctaText: marketingData.hero?.ctaText || "",
			ctaHref: marketingData.hero?.ctaHref || "",
		})

		await client.createOrReplace({
			_type: "marketingAgencyForm",
			_id: "marketingAgencyForm",
			heading: marketingData.form?.heading || "",
			content: marketingData.form?.content || "",
			subContent: marketingData.form?.subContent || "",
			cta: marketingData.form?.cta || "",
			formHeading: marketingData.form?.formHeading || "",
			buttonText: marketingData.form?.buttonText || "",
		})

		await client.createOrReplace({
			_type: "marketingAgencyIntro",
			_id: "marketingAgencyIntro",
			heading: marketingData.introParagraph?.heading || "",
			problemStatement: marketingData.introParagraph?.problemStatement || "",
			valueProposition: marketingData.introParagraph?.valueProposition || "",
		})

		await client.createOrReplace({
			_type: "marketingAgencyPainPoints",
			_id: "marketingAgencyPainPoints",
			heading: marketingData.painPoints?.heading || "",
			subheading: marketingData.painPoints?.subheading || "",
			items:
				marketingData.painPoints?.painPoints?.map((item: any) => ({
					problem: item.problem || "",
					solution: item.solution || "",
				})) || [],
		})

		await client.createOrReplace({
			_type: "marketingAgencyProcess",
			_id: "marketingAgencyProcess",
			heading: marketingData.process?.heading || "",
			steps: marketingData.process?.steps || [],
			content: marketingData.process?.content || [],
		})

		const mapBenefits = (items: any[]) =>
			items?.map((item) => ({
				title: item.title || "",
				description: item.description || "",
				icon: item.icon || "",
			})) || []

		await client.createOrReplace({
			_type: "marketingAgencyKeyBenefits",
			_id: "marketingAgencyKeyBenefits",
			heading: marketingData.keyBenefits?.heading || "",
			subheading: marketingData.keyBenefits?.subheading || "",
			benefits: mapBenefits(marketingData.keyBenefits?.benefits || []),
			items: mapBenefits(marketingData.keyBenefits?.items || []),
		})

		await client.createOrReplace({
			_type: "marketingAgencyFeatures",
			_id: "marketingAgencyFeatures",
			heading: marketingData.features?.heading || "",
			subheading: marketingData.features?.subheading || "",
			features:
				marketingData.features?.features?.map((feature: any) => ({
					title: feature.title || "",
					description: feature.description || "",
					icon: feature.icon || "",
				})) || [],
		})

		await client.createOrReplace({
			_type: "marketingAgencyFaq",
			_id: "marketingAgencyFaq",
			serviceName: marketingData.faq?.serviceName || "",
			heading: marketingData.faq?.heading || "",
			subheading: marketingData.faq?.subheading || "",
			faqs:
				marketingData.faq?.faqs?.map((faq: any) => ({
					q: faq.q || "",
					a: faq.a || "",
				})) || [],
		})

		console.log("✅ Seeded Marketing Agency Page\n")
	} catch (error: any) {
		console.error(
			"❌ Error seeding Marketing Agency Page:",
			error.message || error
		)
	}
}

/**
 * Main seed function
 */
async function seedAll() {
	console.log("🚀 Starting comprehensive seed...\n")

	const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
	const writeToken =
		process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN

	if (!projectId) {
		console.error(
			"❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID environment variable is required"
		)
		process.exit(1)
	}

	if (!writeToken) {
		console.error(
			"❌ Error: SANITY_API_WRITE_TOKEN or SANITY_API_READ_TOKEN environment variable is required"
		)
		process.exit(1)
	}

	console.log(`✅ Using project ID: ${projectId}`)
	console.log(
		`✅ Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}\n`
	)

	const client = getClient()

	try {
		// Seed service pages
		await seedSeoPages(client)
		await seedPaidAdsPages(client)
		await seedServicePages(
			client,
			"Social Media",
			socialMediaData,
			"socialMediaPage"
		)
		await seedServicePages(
			client,
			"Content Marketing",
			contentMarketingData,
			"contentMarketingPage"
		)
		await seedServicePages(
			client,
			"Web Development",
			webDevelopmentData,
			"webDevelopmentPage"
		)
		await seedServicePages(
			client,
			"App Development",
			appDevelopmentData,
			"appDevelopmentPage"
		)
		await seedServicePages(
			client,
			"Hosting & IT Security",
			hostingItSecurityData,
			"hostingItSecurityPage"
		)
		await seedServicePages(
			client,
			"AI Automation",
			aiAutomationData,
			"aiAutomationPage"
		)
		await seedServicePages(
			client,
			"Data Analytics",
			dataAnalyticsData,
			"dataAnalyticsPage"
		)
		await seedServicePages(
			client,
			"Industries",
			industriesData,
			"industriesPage"
		)
		await seedServicePages(
			client,
			"Professionals Marketing",
			professionalsMarketingData,
			"professionalsMarketingPage"
		)
		await seedMarketingAgencyPage(client)

		// Seed page sections
		await seedHomePageSections(client)
		await seedPortfolioSections(client)
		await seedAboutSections(client)
		await seedResourcesSections(client)

		// Seed site-wide settings
		await seedNavbarSettings(client)
		await seedFooterSettings(client)

		console.log("=".repeat(50))
		console.log("🎉 All seeding completed successfully!")
		console.log("=".repeat(50))
	} catch (error) {
		console.error("\n💥 Seed failed:", error)
		process.exit(1)
	}
}

// Run the seed function
seedAll()
	.then(() => {
		console.log("\n✅ Seed process completed!")
		process.exit(0)
	})
	.catch((error) => {
		console.error("\n💥 Seed process failed:", error)
		process.exit(1)
	})

