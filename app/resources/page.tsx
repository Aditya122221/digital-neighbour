import type { Metadata } from "next"
import { buildMetadata } from "@/lib/site-metadata"
import { getResourcesPageData } from "@/lib/resources-data"
import ResourcesGrid from "@/components/resources/grid"
import ResourcesHero from "@/components/resources/hero"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"

const FALLBACK_TITLE = "Resources | Digital Neighbour"
const FALLBACK_DESCRIPTION =
	"Explore insights on marketing, branding, social media, and growth. Curated by Digital Neighbour."

// Force dynamic rendering to always fetch fresh data from Sanity
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
	const resourcesData = await getResourcesPageData()
	const seoTitle = resourcesData.seo?.title?.trim()
	const seoDescription = resourcesData.seo?.description?.trim()

	return buildMetadata({
		title: seoTitle || resourcesData.metadata || FALLBACK_TITLE,
		description: seoDescription || resourcesData.description || FALLBACK_DESCRIPTION,
		path: "/resources",
		openGraphTitle: resourcesData.seo?.ogTitle,
		openGraphDescription: resourcesData.seo?.ogDescription,
		openGraphImage: resourcesData.seo?.ogImage,
		keywords: resourcesData.seo?.keywords,
		canonicalUrl: resourcesData.seo?.canonicalUrl,
	})
}

export default async function ResourcesPage() {
	return (
		<main className="flex min-h-screen w-full flex-col">
			<div className="relative">
				<Navbar />
				<ResourcesHero />
			</div>
			<ResourcesGrid />
			<Footer />
		</main>
	)
}
