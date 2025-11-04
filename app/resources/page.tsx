import ResourcesGrid from "@/components/resources/grid"
import ResourcesHero from "@/components/resources/hero"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"

export const metadata = {
	title: "Resources | Digital Neighbour",
	description:
		"Explore insights on marketing, branding, social media, and growth. Curated by Digital Neighbour.",
}

export default function ResourcesPage() {
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
