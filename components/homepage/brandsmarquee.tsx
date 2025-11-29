import BrandsMarqueeClient from "./brandsmarquee-client"
import { getTrustedBrandsData } from "@/lib/trusted-brands-data"

type BrandsMarqueeProps = {
	data?: {
		heading?: string
		logos?: {
			name?: string
			image?: string
		}[]
	}
}

const FALLBACK_HEADING = "Trusted by top brands"

const normalizeLogos = (
	logos: {
		name?: string
		image?: string
	}[] = []
) =>
	logos
		.map((logo) => ({
			name: logo?.name || "",
			path: logo?.image || "",
		}))
		.filter((logo) => Boolean(logo.path))

export default async function BrandsMarquee({ data }: BrandsMarqueeProps) {
	const hasProvidedLogos = Boolean(data?.logos && data.logos.length > 0)
	let trustedBrandsData = hasProvidedLogos ? data! : await getTrustedBrandsData()

	let heading = trustedBrandsData.heading || FALLBACK_HEADING
	let logos = normalizeLogos(trustedBrandsData.logos)

	if (hasProvidedLogos && logos.length === 0) {
		const sanityData = await getTrustedBrandsData()
		heading = heading || sanityData.heading || FALLBACK_HEADING
		logos = normalizeLogos(sanityData.logos)
	}

	if (logos.length === 0) {
		logos = [
			{ name: "A1", path: "/topbrands/A1-Logo.png" },
			{ name: "Balustrading Concepts", path: "/topbrands/balustrading-concepts-logo.jpg.webp" },
			{ name: "Christchurch City Flowers", path: "/topbrands/christchurchcityflowers-logo.webp" },
			{ name: "City Clean", path: "/topbrands/cityclean-logo.png" },
			{ name: "CSG", path: "/topbrands/csg-logo.png" },
			{ name: "Foodland", path: "/topbrands/foodland-logo.webp" },
			{ name: "Krishna", path: "/topbrands/krishna-logo.jpg" },
			{ name: "Little Climbers", path: "/topbrands/littleclimbers-logo.webp" },
			{ name: "Mughal Kitchen", path: "/topbrands/mughalkitchen-logo.jpg" },
			{ name: "PRA", path: "/topbrands/pra-logo.png" },
			{ name: "Quality Care Dental", path: "/topbrands/qualitycaredental.jpg" },
			{ name: "VP", path: "/topbrands/vp-logo.png" },
		]
	}

	return <BrandsMarqueeClient heading={heading} logos={logos} />
}

