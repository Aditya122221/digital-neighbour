"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useCallback, useEffect, useMemo, useState } from "react"
import { CustomButton } from "@/components/core/button"

interface AppDevHeroProps {
	data: {
		heading: string
		subheading: string
	}
}

export default function AppDevHero({ data }: AppDevHeroProps) {
	const slides = useMemo(
		() => [
			{
				id: "slide-1",
				image: "/seo/mobileHero.webp",
				alt: "Account information dashboard",
			},
			{
				id: "slide-2",
				image: "/seo/hero.webp",
				alt: "Loan details dashboard",
			},
			{
				id: "slide-3",
				image: "/seo/services/contstra.webp",
				alt: "Construction services dashboard",
			},
			{
				id: "slide-4",
				image: "/seo/services/localkey.webp",
				alt: "Local key metrics dashboard",
			},
			{
				id: "slide-5",
				image: "/seo/services/locallink.webp",
				alt: "Local link analysis dashboard",
			},
		],
		[]
	)

	const [activeIndex, setActiveIndex] = useState(0)
	const [direction, setDirection] = useState(1)

	const goToNext = useCallback(() => {
		setDirection(1)
		setActiveIndex((prev) => (prev + 1) % slides.length)
	}, [slides.length])

	const goToPrev = useCallback(() => {
		setDirection(-1)
		setActiveIndex(
			(prev) => (prev - 1 + slides.length) % slides.length
		)
	}, [slides.length])

	useEffect(() => {
		const timer = setInterval(goToNext, 6000)
		return () => clearInterval(timer)
	}, [goToNext])

	const slideVariants = {
		enter: (dir: number) => ({
			opacity: 0,
			x: dir > 0 ? 80 : -80,
		}),
		center: {
			opacity: 1,
			x: 0,
		},
		exit: (dir: number) => ({
			opacity: 0,
			x: dir > 0 ? -80 : 80,
		}),
	}

	return (
		<section className="bg-gradient-to-br from-black via-black to-yellow pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32 overflow-x-hidden">
			<div className="container mx-auto py-6 md:py-0 px-6 lg:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Left side - Text content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							duration: 0.8,
							ease: "easeOut",
						}}
						className="space-y-6 max-w-xl mx-auto"
					>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight font-cal-sans">
							{data.heading}
						</h1>
						<p className="text-lg md:text-xl text-white/80 leading-relaxed">
							{data.subheading}
						</p>
						<CustomButton
							text="Talk to our App Development expert"
							href="/contact"
							textColor="black"
							borderColor="black"
							className="mt-6"
						/>
					</motion.div>

					{/* Right side - Auto carousel */}
					<div className="relative mx-auto hidden w-full max-w-xl items-center justify-center lg:flex">
						<button
							type="button"
							onClick={goToPrev}
							aria-label="Previous slide"
							className="flex h-12 w-12 items-center justify-center border-white/40 bg-white/10 text-2xl text-white shadow-lg backdrop-blur transition hover:bg-white/20"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								className="block rtl:-scale-x-100"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M13.8316 17.5554L7.11573 10L13.8316 2.44464L12.8351 1.55883L5.72548 9.5571L5.72548 10.4429L12.8351 18.4412L13.8316 17.5554Z"
									fill="#666D73"
								></path>
							</svg>
						</button>

						<div className="relative w-full overflow-hidden rounded-[32px] bg-white/5 px-6 pb-10 pt-8 shadow-2xl backdrop-blur-lg">
							<AnimatePresence
								mode="wait"
								initial={false}
							>
								<motion.div
									key={
										slides[
											activeIndex
										]
											.id
									}
									custom={
										direction
									}
									variants={
										slideVariants
									}
									initial="enter"
									animate="center"
									exit="exit"
									transition={{
										duration: 0.6,
										ease: "easeOut",
									}}
									className="relative flex h-[360px] w-full items-center justify-center"
								>
									<Image
										src={
											slides[
												activeIndex
											]
												.image
										}
										alt={
											slides[
												activeIndex
											]
												.alt
										}
										fill
										sizes="(min-width: 1024px) 480px, 90vw"
										className="rounded-[24px] object-cover"
										priority
									/>
								</motion.div>
							</AnimatePresence>
							<div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/10" />
						</div>

						<button
							type="button"
							onClick={goToNext}
							aria-label="Next slide"
							className="flex h-12 w-12 items-center justify-center bg-white/10 text-2xl text-white shadow-lg backdrop-blur transition hover:bg-white/20"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								className="block rtl:-scale-x-100"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M6.16833 17.5554L12.8842 10L6.16833 2.44464L7.16488 1.55883L14.2745 9.5571L14.2745 10.4429L7.16488 18.4412L6.16833 17.5554Z"
									fill="#464849"
								></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}
