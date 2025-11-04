"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

export default function AboutHero() {
	const sectionRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	})

	const springConfig = { stiffness: 120, damping: 24, mass: 0.35 }

	// Blur effect for text - clears as scroll down, blurs when scroll up
	// Starts clear (blur 0), gets blurry when scrolling up past a certain point
	const textBlur = useSpring(
		useTransform(scrollYProgress, [0, 0.3], [0, 15]),
		springConfig
	)
	const textOpacity = useSpring(
		useTransform(scrollYProgress, [0, 0.3], [1, 0.6]),
		springConfig
	)

	// Word reveal animations
	const words = [
		"We",
		"craft",
		"strategies",
		"that",
		"feel",
		"authentic,",
		"perform",
		"exceptionally,",
		"and",
		"help",
		"brands",
		"grow",
		"in",
		"ways",
		"that",
		"actually",
		"matter.",
	]

	return (
		<section
			ref={sectionRef}
			className="relative px-6 bg-gradient-to-b from-white to-pink/20 overflow-hidden pt-28 md:pt-32"
		>
			{/* Black background spacer for navbar only */}
			<div className="absolute top-0 left-0 right-0 h-16 md:h-20 bg-black z-0" />

			{/* Big Image at Top */}
			<div className="relative w-full h-[60vh] md:h-[65vh] mb-16 z-10">
				<Image
					src="/aboutImage.avif"
					alt="Team Behind Your Growth"
					fill
					className="object-cover rounded-xl"
					priority
				/>
			</div>

			<div className="container max-w-7xl mx-auto relative z-10 pb-32">
				{/* Hero content centered - no blur at start */}
				<motion.div
					className="text-center mb-16"
					style={{
						filter: `blur(${textBlur}px)`,
						opacity: textOpacity,
					}}
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.8,
						ease: "easeOut",
					}}
				>
					<h1 className="text-5xl md:text-6xl lg:text-7xl font-regular text-blackbrown mb-8 text-balance font-cal-sans tracking-wide">
						Team Behind Your{" "}
						<motion.span
							className="relative inline-block"
							initial={{
								opacity: 0,
								y: 50,
							}}
							animate={{
								opacity: 1,
								y: 0,
							}}
							transition={{
								duration: 0.8,
								delay: 0.3,
								ease: "easeOut",
							}}
						>
							<span className="absolute bottom-2 left-0 right-0 h-3/5 bg-yellow" />
							<span className="relative z-10 font-medium italic">
								Growth
							</span>
						</motion.span>
					</h1>
					<p className="text-lg md:text-xl font-light text-blackbrown/80 max-w-3xl mx-auto text-pretty">
						We're more than just a marketing
						agency—we're a team of
						storytellers, strategists, and
						problem-solvers dedicated to
						helping brands grow and connect
						with their audiences.
					</p>
				</motion.div>

				{/* Animated text block with scroll reveal - centered, no blur at start */}
				<motion.div
					className="flex flex-wrap justify-center gap-2 md:gap-3 mb-20 relative z-10"
					style={{
						filter: `blur(${textBlur}px)`,
						opacity: textOpacity,
					}}
				>
					{words.map((word, index) => {
						const startProgress =
							index * 0.05
						const endProgress =
							startProgress + 0.1

						const opacity = useSpring(
							useTransform(
								scrollYProgress,
								[
									startProgress,
									endProgress,
								],
								[0, 1]
							),
							springConfig
						)
						const y = useSpring(
							useTransform(
								scrollYProgress,
								[
									startProgress,
									endProgress,
								],
								[30, 0]
							),
							springConfig
						)

						return (
							<motion.span
								key={index}
								className="text-2xl md:text-3xl lg:text-4xl font-medium text-blackbrown"
								style={{
									opacity,
									y,
								}}
							>
								{word}
							</motion.span>
						)
					})}
				</motion.div>
			</div>
		</section>
	)
}
