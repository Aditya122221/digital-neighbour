"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { CustomButton } from "@/components/core/button"

interface SpecialisationItem {
	slug: string
	title: string
	introParagraph?: {
		heading?: string
		problemStatement?: string
		valueProposition?: string
	}
	painPoints?: {
		heading?: string
		subheading?: string
		painPoints?: { problem: string; solution: string }[]
	}
	keyBenefits?: {
		heading?: string
		subheading?: string
		benefits?: { title: string; description: string }[]
	}
}

interface SeoSpecialisationsProps {
	items?: SpecialisationItem[]
}

export default function SeoSpecialisations({ items }: SeoSpecialisationsProps) {
	if (!items || items.length === 0) {
		return null
	}

	return (
		<section className="py-20 md:py-24 lg:py-28 bg-gradient-to-b from-white to-pink/20">
			<div className="container mx-auto px-6 lg:px-12">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{
						duration: 0.6,
						ease: "easeOut",
					}}
					className="max-w-3xl mx-auto text-center mb-12"
				>
					<span className="uppercase tracking-[0.35em] text-xs md:text-sm text-black/60">
						specialised seo programs
					</span>
					<h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-regular text-blackbrown font-cal-sans">
						Tailored SEO Funnels for Your
						Reality
					</h2>
					<p className="mt-4 text-base md:text-lg text-gray-700">
						Every growth challenge needs a
						different SEO playbook. Choose
						the path that matches your
						platform, business model, and
						the problems you need solved
						first.
					</p>
				</motion.div>
				<div className="grid gap-8 md:gap-10 lg:gap-12 md:grid-cols-2">
					{items.map((item, index) => {
						const headline =
							item.introParagraph
								?.heading ||
							item.title
						const summary =
							item.introParagraph
								?.valueProposition ||
							item.introParagraph
								?.problemStatement
						const painPoints =
							item.painPoints?.painPoints?.slice(
								0,
								3
							) || []
						const benefits =
							item.keyBenefits?.benefits?.slice(
								0,
								3
							) || []

						return (
							<motion.article
								key={item.slug}
								initial={{
									opacity: 0,
									y: 32,
								}}
								whileInView={{
									opacity: 1,
									y: 0,
								}}
								viewport={{
									once: true,
								}}
								transition={{
									duration: 0.6,
									ease: "easeOut",
									delay:
										index *
										0.05,
								}}
								className="relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_30px_60px_-40px_rgba(0,0,0,0.45)]"
							>
								<div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow via-pink to-orange" />
								<div className="flex h-full flex-col gap-8 p-8 md:p-10">
									<div className="flex flex-wrap items-start justify-between gap-4">
										<div>
											<p className="text-sm uppercase tracking-[0.35em] text-black/50">
												{
													item.title
												}
											</p>
											<h3 className="mt-2 text-2xl md:text-3xl font-regular text-blackbrown font-cal-sans leading-tight">
												{
													headline
												}
											</h3>
										</div>
										<Link
											href={`/seo/${item.slug}`}
											className="flex items-center gap-2 text-sm font-medium text-black hover:text-blackbrown"
										>
											<span>
												View
												program
											</span>
											<ArrowUpRight className="h-4 w-4" />
										</Link>
									</div>
									{summary && (
										<p className="text-base text-gray-700 leading-relaxed">
											{
												summary
											}
										</p>
									)}
									<div className="grid gap-6 md:grid-cols-2">
										<div className="space-y-3">
											<p className="text-sm uppercase tracking-[0.3em] text-black/50">
												real-world
												blockers
											</p>
											<ul className="space-y-2">
												{painPoints.map(
													(
														point,
														idx
													) => (
														<li
															key={
																idx
															}
															className="flex gap-2 text-sm text-gray-700"
														>
															<span className="mt-1 block h-1.5 w-1.5 rounded-full bg-yellow" />
															<span>
																{
																	point.problem
																}
															</span>
														</li>
													)
												)}
											</ul>
										</div>
										<div className="space-y-3">
											<p className="text-sm uppercase tracking-[0.3em] text-black/50">
												what
												you
												gain
											</p>
											<ul className="space-y-2">
												{benefits.map(
													(
														benefit,
														idx
													) => (
														<li
															key={
																idx
															}
															className="flex gap-2 text-sm text-gray-700"
														>
															<span className="mt-1 block h-1.5 w-1.5 rounded-full bg-black" />
															<span>
																{benefit.description ||
																	benefit.title}
															</span>
														</li>
													)
												)}
											</ul>
										</div>
									</div>
									<div className="pt-2">
										<CustomButton
											text="See engagement details"
											href={`/seo/${item.slug}`}
											textColor="black"
											borderColor="black"
										/>
									</div>
								</div>
							</motion.article>
						)
					})}
				</div>
			</div>
		</section>
	)
}
