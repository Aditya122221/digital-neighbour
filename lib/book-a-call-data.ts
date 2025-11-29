import { sanityFetch } from "@/sanity/lib/fetch"
import { bookACallSectionQuery } from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"

export type BookACallData = {
	heading?: string
	description?: string
	subDescription?: string
	buttonText?: string
	buttonLink?: string
	illustrationImage?: string
}

const FALLBACK_DATA: BookACallData = {
	heading: "Book a call now.",
	description: "Let's talk about what's holding your growth back.",
	subDescription: "No sales pitch, just a genuine conversation with our agency's director about your business.",
	buttonText: "Book a call",
	buttonLink: "/contact",
	illustrationImage: "/homepage/contactus-vector.svg",
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

const transformSanityData = (sanityData: any): BookACallData | null => {
	if (!sanityData) return null

	const contentExists =
		sanityData.heading ||
		sanityData.description ||
		sanityData.subDescription ||
		sanityData.buttonText ||
		sanityData.buttonLink ||
		sanityData.illustrationImage

	if (!contentExists) {
		return null
	}

	return {
		heading: sanityData.heading || FALLBACK_DATA.heading,
		description: sanityData.description || FALLBACK_DATA.description,
		subDescription: sanityData.subDescription || FALLBACK_DATA.subDescription,
		buttonText: sanityData.buttonText || FALLBACK_DATA.buttonText,
		buttonLink: sanityData.buttonLink || FALLBACK_DATA.buttonLink,
		illustrationImage: getImageUrl(sanityData.illustrationImage) || FALLBACK_DATA.illustrationImage,
	}
}

export async function getBookACallSectionData(): Promise<BookACallData> {
	try {
		const sanityData = await sanityFetch({ query: bookACallSectionQuery })
		const transformed = transformSanityData(sanityData)
		if (transformed) {
			return transformed
		}
	} catch (error) {
		console.error("Error fetching Book a Call data from Sanity:", error)
	}

	return FALLBACK_DATA
}


