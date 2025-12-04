import type { Metadata } from "next"

const SITE_URL = "https://digital-neighbour.com"

type BuildMetadataOptions = {
	title: string
	description: string
	path: string
	type?: "website" | "article"
	includeBrand?: boolean
	openGraphTitle?: string
	openGraphDescription?: string
	openGraphImage?: string | { url: string; width?: number; height?: number }
	keywords?: string[]
	canonicalUrl?: string
}

const ACRONYM_OVERRIDES: Record<string, string> = {
	ai: "AI",
	app: "App",
	b2b: "B2B",
	b2c: "B2C",
	cms: "CMS",
	cta: "CTA",
	d2c: "D2C",
	erp: "ERP",
	mvp: "MVP",
	orm: "ORM",
	ppc: "PPC",
	pr: "PR",
	seo: "SEO",
	sge: "SGE",
	smb: "SMB",
	ugc: "UGC",
	ux: "UX",
	voice: "Voice",
	vps: "VPS",
	x: "X",
}

const BRAND_NAME = "Digital Neighbour"

export function humanizeSlug(slug: string): string {
	return slug
		.split("-")
		.filter(Boolean)
		.map((segment) => {
			const normalized = segment.toLowerCase()
			if (ACRONYM_OVERRIDES[normalized]) {
				return ACRONYM_OVERRIDES[normalized]
			}

			if (normalized === "youtube") {
				return "YouTube"
			}
			if (normalized === "linkedin") {
				return "LinkedIn"
			}
			if (normalized === "facebook") {
				return "Facebook"
			}
			if (normalized === "tiktok") {
				return "TikTok"
			}
			if (normalized === "snapchat") {
				return "Snapchat"
			}
			if (normalized === "wordpress") {
				return "WordPress"
			}
			if (normalized === "shopify") {
				return "Shopify"
			}
			if (normalized === "bing") {
				return "Bing"
			}

			return segment
				.toLowerCase()
				.replace(/^\w/, (char) => char.toUpperCase())
		})
		.join(" ")
}

export function buildMetadata({
	title,
	description,
	path,
	type = "website",
	includeBrand = true,
	openGraphTitle,
	openGraphDescription,
	openGraphImage,
	keywords,
	canonicalUrl: canonicalUrlOverride,
}: BuildMetadataOptions): Metadata {
	const normalizedTitle =
		includeBrand && !title.includes(BRAND_NAME)
			? `${title} | ${BRAND_NAME}`
			: title

	const canonicalUrl = canonicalUrlOverride || `${SITE_URL}${path}`

	const ogImageUrl =
		typeof openGraphImage === "string"
			? openGraphImage
			: openGraphImage?.url

	const metadata: Metadata = {
		title: normalizedTitle,
		description,
		alternates: {
			canonical: canonicalUrl,
		},
		openGraph: {
			title: openGraphTitle ?? normalizedTitle,
			description: openGraphDescription ?? description,
			type,
			url: canonicalUrl,
		},
	}

	if (keywords && keywords.length > 0) {
		metadata.keywords = keywords
	}

	if (ogImageUrl) {
		metadata.openGraph = {
			...metadata.openGraph,
			images: [
				{
					url: ogImageUrl,
					width: typeof openGraphImage === "object" ? openGraphImage.width : undefined,
					height: typeof openGraphImage === "object" ? openGraphImage.height : undefined,
				},
			],
		}
	}

	return metadata
}


type SeoSettingsImage =
	| string
	| {
			url?: string | null
			asset?: {
				url?: string | null
				[key: string]: unknown
			} | null
			[key: string]: unknown
	  }
	| null
	| undefined

export type SeoSettingsLike = {
	title?: string | null
	description?: string | null
	keywords?: (string | null | undefined)[] | null
	ogTitle?: string | null
	ogDescription?: string | null
	ogImage?: SeoSettingsImage
	canonicalUrl?: string | null
}

type BuildMetadataFromSeoSettingsOptions = {
	seoSettings?: SeoSettingsLike | null
	fallbackTitle: string
	fallbackDescription: string
	path: string
	type?: "website" | "article"
	includeBrand?: boolean
}

function normalizeString(value?: string | null): string | undefined {
	if (typeof value !== "string") {
		return undefined
	}
	const trimmed = value.trim()
	return trimmed.length > 0 ? trimmed : undefined
}

function resolveOgImageUrl(image?: SeoSettingsImage): string | undefined {
	if (!image) {
		return undefined
	}

	if (typeof image === "string") {
		return normalizeString(image)
	}

	const directUrl = normalizeString(image.url as string | undefined)
	if (directUrl) {
		return directUrl
	}

	const assetUrl = normalizeString(image.asset?.url as string | undefined)
	if (assetUrl) {
		return assetUrl
	}

	return undefined
}

export function buildMetadataFromSeoSettings({
	seoSettings,
	fallbackTitle,
	fallbackDescription,
	path,
	type,
	includeBrand,
}: BuildMetadataFromSeoSettingsOptions): Metadata {
	const title =
		normalizeString(seoSettings?.title) ?? normalizeString(fallbackTitle) ?? fallbackTitle
	const description =
		normalizeString(seoSettings?.description) ??
		normalizeString(fallbackDescription) ??
		fallbackDescription

	const keywords =
		Array.isArray(seoSettings?.keywords) && seoSettings?.keywords.length
			? seoSettings.keywords
					.map((keyword) => normalizeString(keyword))
					.filter((keyword): keyword is string => Boolean(keyword))
			: undefined

	const openGraphImage = resolveOgImageUrl(seoSettings?.ogImage)

	return buildMetadata({
		title,
		description,
		path,
		type,
		includeBrand,
		openGraphTitle: normalizeString(seoSettings?.ogTitle),
		openGraphDescription: normalizeString(seoSettings?.ogDescription),
		openGraphImage,
		keywords,
		canonicalUrl: normalizeString(seoSettings?.canonicalUrl),
	})
}

type BuildLocationMetadataOptions = BuildMetadataFromSeoSettingsOptions & {
	locationName: string
}

function titleIncludesLocation(title: string, locationName: string) {
	return title.toLowerCase().includes(locationName.toLowerCase())
}

function appendLocationToTitle(title: string, locationName: string) {
	if (!locationName.trim() || titleIncludesLocation(title, locationName)) {
		return title
	}

	const brandSuffix = ` | ${BRAND_NAME}`
	if (title.endsWith(brandSuffix)) {
		const baseTitle = title.slice(0, -brandSuffix.length).trimEnd()
		return `${baseTitle} in ${locationName}${brandSuffix}`
	}

	return `${title} in ${locationName}`
}

function appendLocationToDescription(description: string, locationName: string) {
	if (!locationName.trim() || titleIncludesLocation(description, locationName)) {
		return description
	}

	const trimmed = description.trimEnd()
	const endingPunctuation = trimmed.match(/[.!?]$/)

	if (endingPunctuation) {
		const withoutPunctuation = trimmed.slice(0, -1)
		return `${withoutPunctuation} in ${locationName}${endingPunctuation[0]}`
	}

	return `${trimmed} in ${locationName}`
}

export function buildLocationMetadataFromSeoSettings({
	locationName,
	...options
}: BuildLocationMetadataOptions): Metadata {
	const metadata = buildMetadataFromSeoSettings(options)

	if (typeof metadata.title === "string") {
		metadata.title = appendLocationToTitle(metadata.title, locationName)
	}

	if (typeof metadata.description === "string") {
		metadata.description = appendLocationToDescription(metadata.description, locationName)
	}

	if (metadata.openGraph?.title && typeof metadata.openGraph.title === "string") {
		metadata.openGraph.title = appendLocationToTitle(
			metadata.openGraph.title,
			locationName,
		)
	}

	if (metadata.openGraph?.description && typeof metadata.openGraph.description === "string") {
		metadata.openGraph.description = appendLocationToDescription(
			metadata.openGraph.description,
			locationName,
		)
	}

	return metadata
}

