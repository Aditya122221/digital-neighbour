import { sanityFetch } from "@/sanity/lib/fetch"
import { testimonialsSectionQuery } from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"

export type Testimonial = {
	quote?: string
	author?: string
	position?: string
	number?: string
	image?: string
}

export type TestimonialsSectionData = {
	eyebrow?: string
	heading?: string
	testimonials?: Testimonial[]
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
	{
		quote: "Smart design, smooth delivery, Franklin is great to work with.",
		author: "Lucas Bennett",
		position: "Product Manager, Hexa Studio",
		number: "01/05",
		image: "/testimonalImage.avif",
	},
	{
		quote: "Exceptional creativity and attention to detail. The team exceeded our expectations.",
		author: "Sarah Chen",
		position: "Marketing Director, TechFlow",
		number: "02/05",
		image: "https://images.pexels.com/photos/34013983/pexels-photo-34013983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	},
	{
		quote: "Professional, reliable, and innovative. Our brand transformation was remarkable.",
		author: "Michael Rodriguez",
		position: "CEO, GrowthLab",
		number: "03/05",
		image: "https://images.pexels.com/photos/7432338/pexels-photo-7432338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	},
	{
		quote: "Outstanding results delivered on time. Highly recommend their services.",
		author: "Emma Thompson",
		position: "Brand Manager, Innovate Co",
		number: "04/05",
		image: "https://images.pexels.com/photos/34006459/pexels-photo-34006459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	},
	{
		quote: "Creative solutions that perfectly captured our vision. Amazing collaboration.",
		author: "David Park",
		position: "Founder, StartupHub",
		number: "05/05",
		image: "https://images.pexels.com/photos/34006447/pexels-photo-34006447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	},
]

const FALLBACK_DATA: TestimonialsSectionData = {
	eyebrow: "Testimonials",
	heading: "Hear From Our Happy Clients",
	testimonials: FALLBACK_TESTIMONIALS,
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

const transformSanityData = (sanityData: any): TestimonialsSectionData | null => {
	if (!sanityData) return null

	const normalizedTestimonials =
		sanityData.testimonials
			?.map((testimonial: any) => ({
				quote: testimonial?.quote || "",
				author: testimonial?.author || "",
				position: testimonial?.position || "",
				number: testimonial?.number || "",
				image: getImageUrl(testimonial?.image),
			}))
			.filter((testimonial: Testimonial) => Boolean(testimonial.quote && testimonial.author)) || []

	if (!sanityData.heading && normalizedTestimonials.length === 0) {
		return null
	}

	return {
		eyebrow: sanityData.eyebrow || FALLBACK_DATA.eyebrow,
		heading: sanityData.heading || FALLBACK_DATA.heading,
		testimonials: normalizedTestimonials.length ? normalizedTestimonials : FALLBACK_TESTIMONIALS,
	}
}

export async function getTestimonialsSectionData(): Promise<TestimonialsSectionData> {
	try {
		const sanityData = await sanityFetch({ query: testimonialsSectionQuery })
		const transformed = transformSanityData(sanityData)
		if (transformed) {
			return transformed
		}
	} catch (error) {
		console.error("Error fetching testimonials data from Sanity:", error)
	}

	return FALLBACK_DATA
}


