import { getPortfolioProjects } from "@/lib/portfolio-data"
import PortfolioCard from "./portfolio-card"

export default async function PortfolioGrid() {
	const portfolio = await getPortfolioProjects()

	return (
		<section className="py-16 md:py-24 px-4">
			<div className="mx-auto w-full max-w-7xl">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					{portfolio.map((item) => (
						<PortfolioCard
							key={item.id || item.slug}
							slug={
								item.slug ||
								`portfolio-${item.id}`
							}
							logoText={item.logoText}
							headline={item.headline}
							metrics={item.metrics}
							tags={item.tags}
							image={item.image}
							imageAlt={item.imageAlt}
							logo={item.logo}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
