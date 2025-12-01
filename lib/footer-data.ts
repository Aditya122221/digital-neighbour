import { sanityFetch } from "@/sanity/lib/fetch"
import { footerQuery } from "@/sanity/lib/queries"

export interface FooterLink {
	label: string
	href: string
}

export interface FooterSocialLink extends FooterLink {
	platform?: string
}

export interface FooterData {
	backgroundVideo?: {
		asset?: {
			_id: string
			url: string
		}
		url?: string
	}
	heading?: string
	highlightedWord?: string
	subheading?: string
	ctaButton?: {
		label: string
		href: string
		variant: string
	}
	companyLinks?: FooterLink[]
	socialLinks?: FooterSocialLink[]
	contactInfo?: {
		phone?: string
		email?: string
		address?: string
	}
	legalLinks?: FooterLink[]
}

/**
 * Get footer data from Sanity
 */
export async function getFooterData(): Promise<FooterData | null> {
	try {
		const data = await sanityFetch<FooterData>({
			query: footerQuery,
			tag: "footer",
		})

		return data
	} catch (error) {
		console.error("Error fetching footer data from Sanity:", error)
		return null
	}
}

