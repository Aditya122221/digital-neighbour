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


