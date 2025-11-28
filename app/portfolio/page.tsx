import type { Metadata } from "next"
import { buildMetadata } from "@/lib/site-metadata"
import { getPortfolioPageData } from "@/lib/portfolio-data"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import PortfolioHero from "@/components/portfolio/hero"
import PortfolioGrid from "@/components/portfolio/portfolio-grid"

const FALLBACK_TITLE = "Portfolio | Digital Neighbour"
const FALLBACK_DESCRIPTION =
	"Explore our portfolio of successful projects and case studies. See how Digital Neighbour has helped brands achieve remarkable growth and measurable results."

// Force dynamic rendering to always fetch fresh data from Sanity
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
	const portfolioData = await getPortfolioPageData()
	return buildMetadata({
		title: portfolioData.metadata || FALLBACK_TITLE,
		description: portfolioData.description || FALLBACK_DESCRIPTION,
		path: "/portfolio",
	})
}

export default async function PortfolioPage() {
	return (
		<main className="flex min-h-screen w-full flex-col bg-gray-50">
			<div className="relative">
				<Navbar />
				<PortfolioHero />
			</div>
			<PortfolioGrid />
			<Footer />
		</main>
	)
}

