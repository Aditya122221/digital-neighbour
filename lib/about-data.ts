import type { Image } from "sanity"

import aboutData from "@/data/about.json"
import { sanityFetch } from "@/sanity/lib/fetch"
import { urlForImage } from "@/sanity/lib/image"
import { aboutPageQuery } from "@/sanity/lib/queries"
import type { PageSeoSettings } from "@/lib/types/page-seo"

export type AboutHeroContent = {
	title: string
	highlight: string
	description: string
	image: string
	words: string[]
}

export type AboutOriginsContent = {
	title: string
	description: string
	images: Array<{
		src: string
		alt: string
	}>
}

export type AboutValueItem = {
	title: string
	description: string
}

export type AboutValuesContent = {
	title: string
	items: AboutValueItem[]
}

export type AboutAchievementStat = {
	number: string
	label: string
}

export type AboutAchievementsContent = {
	title: string
	description: string
	stats: AboutAchievementStat[]
}

export type TeamMemberSocial = {
	twitter?: string
	linkedin?: string
	instagram?: string
}

export type TeamMember = {
	name: string
	role: string
	image: string
	social?: TeamMemberSocial
}

export type AboutTeamContent = {
	title: string
	description: string
	members: TeamMember[]
}

export const ABOUT_PAGE_FALLBACK_TITLE =
	"About Us - Team Behind Your Brand's Growth | Digital Neighbour"
export const ABOUT_PAGE_FALLBACK_DESCRIPTION =
	"Meet the team of storytellers, strategists, and problem-solvers dedicated to helping brands grow and connect with their audiences. Learn about our values, achievements, and the people behind Digital Neighbour."

export type AboutPageData = {
	hero: AboutHeroContent
	origins: AboutOriginsContent
	values: AboutValuesContent
	achievements: AboutAchievementsContent
	team: AboutTeamContent
	seo?: PageSeoSettings
}

type AboutJson = {
	hero?: {
		title?: string
		highlight?: string
		description?: string
		image?: string
		words?: string[]
		wordsText?: string
	}
	origins?: {
		title?: string
		description?: string
		images?: Array<{
			src?: string
			image?: string
			alt?: string
		}>
	}
	values?: {
		title?: string
		items?: AboutValueItem[]
	}
	achievements?: {
		title?: string
		description?: string
		stats?: AboutAchievementStat[]
		team?: AboutTeamContent
	}
	team?: AboutTeamContent
}

type SanityTeamMember = {
	name?: string
	role?: string
	image?: Image
	social?: TeamMemberSocial
}

type SanityAboutPageData = {
	settings?: {
		metadata?: string
		description?: string
		title?: string
		keywords?: string[]
		ogTitle?: string
		ogDescription?: string
		ogImage?: Image
		canonicalUrl?: string
		structuredData?: string
	}
	hero?: {
		title?: string
		highlightWord?: string
		description?: string
		image?: Image
		wordsText?: string
	}
	origins?: {
		title?: string
		description?: string
		images?: Array<{
			image?: Image
			alt?: string
		}>
	}
	values?: {
		title?: string
		items?: Array<AboutValueItem>
	}
	achievements?: {
		title?: string
		description?: string
		stats?: Array<AboutAchievementStat>
	}
	team?: {
		title?: string
		description?: string
		members?: Array<SanityTeamMember>
	}
}

const DEFAULT_HERO: AboutHeroContent = {
	title: "Team Behind Your Growth",
	highlight: "Growth",
	description:
		"We're more than just a marketing agency—we're a team of storytellers, strategists, and problem-solvers dedicated to helping brands grow and connect with their audiences.",
	image: "/aboutImage.avif",
	words: [
		"We",
		"craft",
		"strategies",
		"that",
		"feel",
		"authentic,",
		"perform",
		"exceptionally,",
		"and",
		"help",
		"brands",
		"grow",
		"in",
		"ways",
		"that",
		"actually",
		"matter.",
	],
}

const DEFAULT_ORIGINS: AboutOriginsContent = {
	title: "The Origins",
	description:
		"Our journey began with a small group of creative minds—marketers, designers, strategists—who shared a passion for turning ideas into impact. We were tired of seeing brands waste time on cookie-cutter solutions that didn't work. So, we took a different approach: blending data-driven strategy with storytelling, creativity, and a touch of intuition.",
	images: [
		{
			src: "/firstimage.avif",
			alt: "Origin story team collaboration",
		},
		{ src: "/secondimage.avif", alt: "Creative strategy workshop" },
	],
}

const DEFAULT_VALUES: AboutValuesContent = {
	title: "Our Values",
	items: [
		{
			title: "Clarity in Strategy",
			description:
				"We believe great marketing starts with clear, intentional strategy. Every campaign we create is driven by data, insight, and a deep understanding of our clients' goals.",
		},
		{
			title: "Creativity with Purpose",
			description:
				"Innovation is at the heart of everything we do. We craft compelling, original content that doesn't just look good—it connects, engages, and drives meaningful results.",
		},
		{
			title: "Collaboration that Elevates",
			description:
				"Success is a shared journey. We work closely with our clients, fostering open communication and mutual trust to build brands that thrive in the digital space.",
		},
	],
}

const DEFAULT_ACHIEVEMENTS: AboutAchievementsContent = {
	title: "Achievements",
	description:
		"Over the years, we've helped businesses grow, engaged audiences with compelling content, and set new benchmarks in digital marketing. Every milestone reflects our commitment to creativity, strategy, and continuous innovation in the ever-evolving digital landscape.",
	stats: [
		{ number: "100+", label: "Brands Transformed" },
		{ number: "300M+", label: "Impressions Generated" },
		{ number: "5x", label: "Average ROI on Campaigns" },
		{ number: "$25M+", label: "in Client Revenue Growth" },
	],
}

const DEFAULT_TEAM: AboutTeamContent = {
	title: "Growth Experts",
	description:
		"Creative thinkers, strategic planners, and digital storytellers—our team is the driving force behind every successful brand.",
	members: [
		{
			name: "John Smith",
			role: "Founder & Lead Strategist",
			image: "/homepage/hero/1.jpg",
			social: {
				twitter: "https://x.com",
				linkedin: "https://linkedin.com",
				instagram: "https://instagram.com",
			},
		},
		{
			name: "Sarah Johnson",
			role: "Creative Director",
			image: "/homepage/hero/2.jpg",
			social: {
				twitter: "https://x.com",
				linkedin: "https://linkedin.com",
				instagram: "https://instagram.com",
			},
		},
		{
			name: "Michael Chen",
			role: "Marketing Analyst",
			image: "/homepage/hero/3.jpg",
			social: {
				twitter: "https://x.com",
				linkedin: "https://linkedin.com",
				instagram: "https://instagram.com",
			},
		},
		{
			name: "Emma Wilson",
			role: "Social Media Manager",
			image: "/homepage/hero/4.jpg",
			social: {
				twitter: "https://x.com",
				linkedin: "https://linkedin.com",
				instagram: "https://instagram.com",
			},
		},
	],
}

const TEAM_PLACEHOLDER_IMAGE = "/placeholder-user.jpg"

const BASE_PAGE_DATA: AboutPageData = {
	hero: DEFAULT_HERO,
	origins: DEFAULT_ORIGINS,
	values: DEFAULT_VALUES,
	achievements: DEFAULT_ACHIEVEMENTS,
	team: DEFAULT_TEAM,
	seo: {
		title: ABOUT_PAGE_FALLBACK_TITLE,
		description: ABOUT_PAGE_FALLBACK_DESCRIPTION,
	},
}

const parsedData = aboutData as AboutJson

const splitTitleForHighlight = (
	fullTitle?: string
): { title?: string; highlight?: string } => {
	if (!fullTitle) {
		return {}
	}

	const parts = fullTitle.trim().split(/\s+/).filter(Boolean)
	if (parts.length === 0) {
		return {}
	}

	if (parts.length === 1) {
		return {
			title: "",
			highlight: parts[0],
		}
	}

	const highlight = parts.pop()
	return {
		title: parts.join(" "),
		highlight,
	}
}

const wordsFromInput = (
	input?: string | string[] | null
): string[] | undefined => {
	if (!input) {
		return undefined
	}

	if (Array.isArray(input)) {
		return input.filter((word): word is string =>
			Boolean(word?.trim())
		)
	}

	return input
		.trim()
		.split(/\s+/)
		.filter((word) => Boolean(word))
}

const getImageUrl = (image?: string | Image | null): string | undefined => {
	if (!image) {
		return undefined
	}

	if (typeof image === "string") {
		return image || undefined
	}

	try {
		return urlForImage(image).url()
	} catch (error) {
		console.warn(
			"Failed to build image URL from Sanity asset:",
			error
		)
		return undefined
	}
}

const normalizeSeoSettings = (settings?: {
	title?: string
	description?: string
	keywords?: string[]
	ogTitle?: string
	ogDescription?: string
	ogImage?: string | Image | null
	canonicalUrl?: string
	structuredData?: string
}): PageSeoSettings | undefined => {
	if (!settings) {
		return undefined
	}

	const keywords = Array.isArray(settings.keywords)
		? settings.keywords
				.map((keyword) =>
					typeof keyword === "string" ? keyword.trim() : ""
				)
				.filter(Boolean)
		: undefined
	const ogImage = getImageUrl(settings.ogImage) ?? undefined
	const hasValue =
		settings.title ||
		settings.description ||
		(keywords && keywords.length > 0) ||
		settings.ogTitle ||
		settings.ogDescription ||
		ogImage ||
		settings.canonicalUrl ||
		settings.structuredData

	if (!hasValue) {
		return undefined
	}

	return {
		title: settings.title || undefined,
		description: settings.description || undefined,
		keywords,
		ogTitle: settings.ogTitle || undefined,
		ogDescription: settings.ogDescription || undefined,
		ogImage,
		canonicalUrl: settings.canonicalUrl || undefined,
		structuredData: settings.structuredData || undefined,
	}
}

const mapTeamMembers = (members?: Array<SanityTeamMember>): TeamMember[] =>
	members
		?.map((member) => ({
			name: member.name ?? "",
			role: member.role ?? "",
			image:
				getImageUrl(member.image) ??
				TEAM_PLACEHOLDER_IMAGE,
			social: member.social,
		}))
		.filter((member) => member.name && member.role) ?? []

const normalizeTeamSection = (teamData?: {
	title?: string
	description?: string
	members?: Array<SanityTeamMember>
}): AboutTeamContent | undefined => {
	if (!teamData) {
		return undefined
	}

	const members = mapTeamMembers(teamData.members)
	if (!teamData.title && !teamData.description && members.length === 0) {
		return undefined
	}

	return {
		title: teamData.title,
		description: teamData.description,
		members,
	}
}

const normalizeLocalData = (
	data?: AboutJson
): Partial<AboutPageData> | undefined => {
	if (!data) {
		return undefined
	}

	const normalized: Partial<AboutPageData> = {}

	if (data.hero) {
		const heroWords =
			wordsFromInput(
				data.hero.wordsText ?? data.hero.words
			) ?? data.hero.words
		const titleParts = splitTitleForHighlight(data.hero.title)
		const heroTitle = data.hero.title ?? DEFAULT_HERO.title

		normalized.hero = {
			title: heroTitle,
			highlight:
				data.hero.highlight ??
				titleParts.highlight ??
				DEFAULT_HERO.highlight,
			description: data.hero.description,
			image: data.hero.image,
			words: heroWords,
		}
	}

	if (data.origins) {
		const images =
			data.origins.images
				?.map((image) => ({
					src: image?.image ?? image?.src ?? "",
					alt: image?.alt ?? "",
				}))
				.filter((image) => Boolean(image.src)) ?? []

		normalized.origins = {
			title: data.origins.title,
			description: data.origins.description,
			images,
		}
	}

	if (data.values) {
		normalized.values = {
			title: data.values.title,
			items: data.values.items,
		}
	}

	if (data.achievements) {
		normalized.achievements = {
			title: data.achievements.title,
			description: data.achievements.description,
			stats: data.achievements.stats,
		}
		if (data.achievements.team) {
			normalized.team = data.achievements.team
		}
	}

	if (data.team) {
		normalized.team = data.team
	}

	return normalized
}

const normalizeSanityData = (
	data?: SanityAboutPageData | null
): Partial<AboutPageData> | undefined => {
	if (!data) {
		return undefined
	}

	const normalized: Partial<AboutPageData> = {}

	const seo = normalizeSeoSettings(data.settings)
	if (seo) {
		normalized.seo = seo
	}

	if (data.hero) {
		const highlightOverride = data.hero.highlightWord?.trim()
		const titleParts = splitTitleForHighlight(data.hero.title)
		const heroTitle = data.hero.title ?? DEFAULT_HERO.title

		normalized.hero = {
			title: heroTitle,
			highlight:
				highlightOverride ??
				titleParts.highlight ??
				DEFAULT_HERO.highlight,
			description: data.hero.description,
			image: getImageUrl(data.hero.image),
			words: wordsFromInput(data.hero.wordsText),
		}
	}

	if (data.origins) {
		const images =
			data.origins.images
				?.map((image) => ({
					src: getImageUrl(image?.image) ?? "",
					alt: image?.alt ?? "",
				}))
				.filter((image) => Boolean(image.src)) ?? []

		normalized.origins = {
			title: data.origins.title,
			description: data.origins.description,
			images,
		}
	}

	if (data.values) {
		normalized.values = {
			title: data.values.title,
			items: data.values.items,
		}
	}

	if (data.achievements) {
		normalized.achievements = {
			title: data.achievements.title,
			description: data.achievements.description,
			stats: data.achievements.stats,
		}
	}

	const normalizedTeam =
		normalizeTeamSection(data.team) ??
		normalizeTeamSection(data.achievements?.team)
	if (normalizedTeam) {
		normalized.team = normalizedTeam
	}

	return normalized
}

const mergeAboutData = (
	base: AboutPageData,
	overrides?: Partial<AboutPageData>
): AboutPageData => {
	const heroWords =
		overrides?.hero?.words && overrides.hero.words.length > 0
			? overrides.hero.words
			: base.hero.words

	const originImages =
		overrides?.origins?.images &&
		overrides.origins.images.length > 0
			? overrides.origins.images
			: base.origins.images

	const valueItems =
		overrides?.values?.items && overrides.values.items.length > 0
			? overrides.values.items
			: base.values.items

	const achievementStats =
		overrides?.achievements?.stats &&
		overrides.achievements.stats.length > 0
			? overrides.achievements.stats
			: base.achievements.stats

	const teamMembers =
		overrides?.team?.members && overrides.team.members.length > 0
			? overrides.team.members
			: base.team.members

	return {
		hero: {
			title: overrides?.hero?.title ?? base.hero.title,
			highlight:
				overrides?.hero?.highlight ??
				base.hero.highlight,
			description:
				overrides?.hero?.description ??
				base.hero.description,
			image: overrides?.hero?.image ?? base.hero.image,
			words: heroWords,
		},
		origins: {
			title: overrides?.origins?.title ?? base.origins.title,
			description:
				overrides?.origins?.description ??
				base.origins.description,
			images: originImages,
		},
		values: {
			title: overrides?.values?.title ?? base.values.title,
			items: valueItems,
		},
		achievements: {
			title:
				overrides?.achievements?.title ??
				base.achievements.title,
			description:
				overrides?.achievements?.description ??
				base.achievements.description,
			stats: achievementStats,
		},
		team: {
			title: overrides?.team?.title ?? base.team.title,
			description:
				overrides?.team?.description ??
				base.team.description,
			members: teamMembers,
		},
		seo: overrides?.seo ?? base.seo,
	}
}

export async function getAboutPageData(): Promise<AboutPageData> {
	const fallback = mergeAboutData(
		BASE_PAGE_DATA,
		normalizeLocalData(parsedData)
	)

	try {
		const sanityData =
			await sanityFetch<SanityAboutPageData | null>({
				query: aboutPageQuery,
			})
		return mergeAboutData(fallback, normalizeSanityData(sanityData))
	} catch (error) {
		console.error(
			"Failed to fetch about page data from Sanity:",
			error
		)
		return fallback
	}
}

export type { AboutPageData }
