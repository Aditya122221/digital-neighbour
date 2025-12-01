import Image from "next/image"
import { getTestimonialsSectionData, type TestimonialsSectionData } from "@/lib/testimonials-data"

function getCompany(position?: string, fallbackCompany?: string) {
	if (fallbackCompany) return fallbackCompany
	if (!position) return ""
	const parts = position.split(",")
	return parts.length > 1 ? parts[parts.length - 1].trim() : position
}

function getInitials(name?: string) {
	if (!name) return ""
	return name
		.split(" ")
		.map((segment) => (segment ? segment[0] : ""))
		.join("")
		.slice(0, 2)
		.toUpperCase()
}

type TestimonalTwoProps = {
	data?: TestimonialsSectionData
}

export default async function TestimonalTwo({ data }: TestimonalTwoProps) {
	const hasTestimonials = Boolean(data?.testimonials && data.testimonials.length > 0)
	const testimonialsData = hasTestimonials ? data! : await getTestimonialsSectionData()
	const testimonials = testimonialsData.testimonials || []

	if (testimonials.length === 0 && !testimonialsData.main) {
		return null
	}

	const eyebrow = testimonialsData.eyebrow || "Testimonials"
	const heading = testimonialsData.heading || "Hear From Our Happy Clients"

	// Main (featured) testimonial content
	const main = testimonialsData.main || {
		logo: undefined,
		companyName: testimonials[0]?.companyName,
		quote: testimonials[0]?.quote,
		author: testimonials[0]?.author,
		position: testimonials[0]?.position,
	}

	const mainImage = testimonialsData.image || testimonials[0]?.image || "/testimonalImage.avif"
	const mainImageAlt =
		testimonialsData.imageAlt || main.companyName || main.author || "Client testimonial"

	// Secondary testimonials: show up to three
	const secondary = testimonials.slice(0, 3)

	return (
		<section className="relative overflow-hidden p-15">
			<div className="relative mx-auto flex flex-col gap-12">
				<header className="mx-auto text-center">
					<span className="inline-flex items-center justify-center rounded-full border border-yellow/50 bg-white px-4 py-1 text-sm font-medium uppercase tracking-[0.3em]">
						{eyebrow}
					</span>
					<h2 className="mt-6 text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl font-cal-sans">{heading}</h2>
				</header>

				<div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr]">
					<div className="group relative overflow-hidden rounded-[32px]">
						<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500" />
						<div className="relative aspect-[4/5] w-full">
							<Image src={mainImage} alt={mainImageAlt} className="object-cover" fill priority />
						</div>
					</div>

					<div
						className="flex h-full flex-col justify-between rounded-[32px] p-8 bg-[#e9e5ff] md:p-12"
						style={{
							boxShadow: "8px 8px 0 0 #5D50EB",
						}}
					>
						<div className="flex items-center gap-4">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-sm font-semibold uppercase tracking-[0.3em] text-white">
								{getInitials(main.author)}
							</div>
							<div className="flex flex-col">
								<span className="text-sm font-semibold uppercase tracking-[0.3em] text-black">
									{getCompany(main.position, main.companyName)}
								</span>
								<span className="text-xs text-black">Client spotlight</span>
							</div>
						</div>

						{main.quote && (
							<blockquote className="mt-10 text-2xl leading-relaxed md:text-[1.75rem] md:leading-[2.5rem] font-cal-sans text-black">
								"{main.quote}"
							</blockquote>
						)}

						<div className="mt-10 flex flex-col gap-1">
							{main.author && <span className="text-base font-semibold text-black">{main.author}</span>}
							{main.position && <span className="text-sm text-black">{main.position}</span>}
						</div>
					</div>
				</div>

				{secondary.length > 0 && (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{secondary.map((testimonial, index) => (
							<article
								key={index}
								className="flex h-full flex-col justify-between rounded-[24px] p-6 bg-[#5D50EB]"
								style={{
									boxShadow: "-8px 0 0 0 black",
								}}
							>
								<div className="flex items-center justify-between">
									<span className="text-xs font-semibold uppercase tracking-[0.3em] text-white">
										{getCompany(testimonial.position, testimonial.companyName)}
									</span>
								</div>
								{testimonial.quote && (
									<blockquote className="mt-6 flex-1 text-base leading-relaxed font-cal-sans text-white">
										"{testimonial.quote}"
									</blockquote>
								)}
								<div className="mt-6">
									{testimonial.author && (
										<p className="text-sm font-semibold text-white">
											{testimonial.author}
										</p>
									)}
									{testimonial.position && (
										<p className="text-xs text-white">{testimonial.position}</p>
									)}
								</div>
							</article>
						))}
					</div>
				)}
			</div>
		</section>
	)
}

