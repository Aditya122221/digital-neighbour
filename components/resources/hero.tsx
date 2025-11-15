import { getResourcesHeroContent } from "@/lib/resources-data"

const HERO_LABEL = "Resources"

export default async function ResourcesHero() {
	const { title, description, details } = await getResourcesHeroContent()
	return (
		<section className="relative bg-black">
			<div className="mx-auto w-full max-w-7xl px-4 py-16 md:py-24">
				<div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<p className="text-sm uppercase tracking-widest text-white/80">
							{HERO_LABEL}
						</p>
						<h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
							{title}
						</h1>
						<p className="mt-4 text-base text-white/70">
							{description}
						</p>
					</div>
					{details.length > 0 && (
						<div className="max-w-md space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-white/80 backdrop-blur">
							{details.map(
								(
									detail,
									index
								) => (
									<p
										key={
											index
										}
										className="text-sm leading-relaxed"
									>
										{
											detail
										}
									</p>
								)
							)}
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
