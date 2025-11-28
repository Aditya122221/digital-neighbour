import { getPortfolioHero } from "@/lib/portfolio-data"

const heroContent = getPortfolioHero()

export default function PortfolioHero() {
	return (
		<section className="relative bg-white">
			<div className="mx-auto w-full max-w-7xl px-4 py-16 md:py-24">
				<div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<p className="text-sm uppercase tracking-widest text-black/80">
							{heroContent.label}
						</p>
						<h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tight text-black md:text-5xl">
							{heroContent.title}
						</h1>
						<p className="mt-4 text-base text-black/70">
							{heroContent.description}
						</p>
					</div>
				</div>
			</div>
			<div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
		</section>
	)
}

