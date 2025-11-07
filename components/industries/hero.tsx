"use client"

import { motion } from "framer-motion"
import { CustomButton } from "@/components/core/button"

interface IndustriesHeroProps {
	data?: {
		heading?: string
		subheading?: string
		buttonText?: string
	}
}

export default function IndustriesHero({ data }: IndustriesHeroProps) {
	const heading = data?.heading || "Home Services"
	const subheading = data?.subheading || "Choose your industry."
	const buttonText = data?.buttonText || "Talk to our experts"

	return (
		<section
			className="relative overflow-hidden pt-24 md:pt-32 lg:pt-40 min-h-[360px] md:min-h-[520px] lg:min-h-[660px]"
			style={{
				paddingBottom: "20px",
				paddingLeft: "12px",
				paddingRight: "12px",
			}}
		>
			<video
				className="absolute inset-0 h-full w-full object-cover"
				autoPlay
				loop
				muted
				playsInline
			>
				<source
					src="/socialMedia/contentBGVideo.mp4"
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>
			<div className="absolute inset-0" />
			<div className="relative z-10 w-full px-0">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{
						duration: 0.6,
						ease: "easeOut",
					}}
					className="pointer-events-none select-none flex flex-col items-center text-center"
				>
					<h1 className="text-white/95 text-4xl md:text-6xl lg:text-7xl font-cal-sans font-semibold tracking-tight">
						{heading}
					</h1>
					<p className="mt-4 text-white/90 text-lg md:text-xl">
						{subheading}
					</p>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{
							opacity: 1,
							y: 0,
						}}
						viewport={{ once: true }}
						transition={{
							duration: 0.6,
							ease: "easeOut",
							delay: 0.2,
						}}
						className="mt-6 pointer-events-auto"
					>
						<CustomButton
							text={buttonText}
							href="/contact"
							textColor="black"
							borderColor="black"
						/>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}
