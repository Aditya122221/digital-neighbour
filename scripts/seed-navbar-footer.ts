import dotenv from "dotenv"
import { resolve } from "path"
import { createClient, type SanityClient } from "@sanity/client"
import * as fs from "fs"
import * as path from "path"

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
		throw error
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
		throw error
	}
}

/**
 * Main seed function for Navbar and Footer only
 */
async function seedNavbarFooter() {
	console.log("🚀 Starting Navbar & Footer seed...\n")

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
		await seedNavbarSettings(client)
		await seedFooterSettings(client)

		console.log("=".repeat(50))
		console.log("🎉 Navbar & Footer seeding completed successfully!")
		console.log("=".repeat(50))
	} catch (error) {
		console.error("\n💥 Seed failed:", error)
		process.exit(1)
	}
}

// Run the seed function
seedNavbarFooter()
	.then(() => {
		console.log("\n✅ Seed process completed!")
		process.exit(0)
	})
	.catch((error) => {
		console.error("\n💥 Seed process failed:", error)
		process.exit(1)
	})

