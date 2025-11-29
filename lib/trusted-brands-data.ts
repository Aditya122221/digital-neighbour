import { sanityFetch } from "@/sanity/lib/fetch"
import { trustedBrandsQuery } from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"

type TrustedBrandLogo = {
	name?: string
	image?: string
}

type TrustedBrandsData = {
	heading?: string
	logos?: TrustedBrandLogo[]
}

const FALLBACK_HEADING = "Trusted by top brands"

const FALLBACK_LOGOS: TrustedBrandLogo[] = [
	{ name: "A1", image: "/topbrands/A1-Logo.png" },
	{ name: "Balustrading Concepts", image: "/topbrands/balustrading-concepts-logo.jpg.webp" },
	{ name: "Christchurch City Flowers", image: "/topbrands/christchurchcityflowers-logo.webp" },
	{ name: "City Clean", image: "/topbrands/cityclean-logo.png" },
	{ name: "CSG", image: "/topbrands/csg-logo.png" },
	{ name: "Foodland", image: "/topbrands/foodland-logo.webp" },
	{ name: "Krishna", image: "/topbrands/krishna-logo.jpg" },
	{ name: "Little Climbers", image: "/topbrands/littleclimbers-logo.webp" },
	{ name: "Mughal Kitchen", image: "/topbrands/mughalkitchen-logo.jpg" },
	{ name: "PRA", image: "/topbrands/pra-logo.png" },
	{ name: "Quality Care Dental", image: "/topbrands/qualitycaredental.jpg" },
	{ name: "VP", image: "/topbrands/vp-logo.png" },
]

const FALLBACK_DATA: TrustedBrandsData = {
	heading: FALLBACK_HEADING,
	logos: FALLBACK_LOGOS,
}

const getImageUrl = (image: any): string => {
	if (!image) return ""
	if (typeof image === "string") return image
	if (image.asset?.url) return image.asset.url
	if (image.asset?._ref) {
		try {
			return urlForImage(image).url()
		} catch {
			return ""
		}
	}
	return ""
}

const transformSanityData = (sanityData: any): TrustedBrandsData | null => {
	if (!sanityData) return null

	const normalizedLogos =
		sanityData.logos
			?.map((logo: any) => ({
				name: logo?.name || "",
				image: getImageUrl(logo?.image),
			}))
			.filter((logo: TrustedBrandLogo) => Boolean(logo.image)) || []

	if (!sanityData.heading && normalizedLogos.length === 0) {
		return null
	}

	return {
		heading: sanityData.heading || FALLBACK_HEADING,
		logos: normalizedLogos.length ? normalizedLogos : FALLBACK_LOGOS,
	}
}

export async function getTrustedBrandsData(): Promise<TrustedBrandsData> {
	try {
		const sanityData = await sanityFetch({ query: trustedBrandsQuery })
		const transformed = transformSanityData(sanityData)
		if (transformed) {
			return transformed
		}
	} catch (error) {
		console.error("Error fetching trusted brands data from Sanity:", error)
	}

	return FALLBACK_DATA
}


