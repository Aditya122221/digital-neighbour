"use client"

import { motion } from "framer-motion"
import { CustomButton } from "@/components/core/button"

interface PremiumCloudServicesData {
	title?: string
	topCards?: Array<{
		title: string
		description: string
	}>
	customApi?: {
		title: string
		badge: string
		description: string
		buttonText: string
		buttonLink: string
	}
	maximumCustomization?: {
		title: string
		description: string
		buttonText: string
		buttonLink: string
		features: Array<{
			title: string
			description: string
		}>
	}
}

interface HostingServicesProps {
	data?: string
	serviceCards?: any[]
	basePath?: string
	premiumCloudServices?: PremiumCloudServicesData
}

export default function HostingServices({
	data,
	serviceCards,
	basePath = "#",
	premiumCloudServices,
}: HostingServicesProps) {
	// Default fallback data
	const defaultData: PremiumCloudServicesData = {
		title: "Premium cloud hosting services",
		topCards: [
			{
				title: "Rock-solid reliability",
				description:
					"Confidently deploy and back up workloads with enterprise-grade nodes and redundant networking and storage.",
			},
			{
				title: "Instant scalability",
				description:
					"In one click, increase or decrease your cloud hosting resources as needed to maintain optimal performance.",
			},
		],
		customApi: {
			title: "Custom",
			badge: "API",
			description:
				"A robust API, Terraform provider, and WHMCS plugin allow easy integration and automation across our cloud hosting platform.",
			buttonText: "Learn more",
			buttonLink: "https://api.liquidweb.com/docs",
		},
		maximumCustomization: {
			title: "Maximum customization and control",
			description:
				"A robust API, Terraform provider, and WHMCS plugin allow easy integration and automation across our cloud hosting platform.",
			buttonText: "Explore cloud servers",
			buttonLink: "#plans",
			features: [
				{
					title: "Management options",
					description:
						"Different levels of management and optional control panel licenses mean you aren't locked into services and features that don't make sense for you.",
				},
				{
					title: "Server oversight",
					description:
						"Root access and our portal's management tools give you full server control.",
				},
				{
					title: "Linux and Windows distros",
					description:
						"We support AlmaLinux, Rocky Linux, Ubuntu, and Windows 2019 and 2022.",
				},
			],
		},
	}

	const content = premiumCloudServices || defaultData

	return (
		<section className="py-20 px-6 bg-gradient-to-b from-pink/20 to-white">
			<div className="container max-w-7xl mx-auto">
				{/* Main Title */}
				<motion.h2
					className="text-3xl md:text-4xl lg:text-5xl font-medium text-blackbrown mb-12 font-cal-sans"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{
						duration: 0.6,
						ease: "easeOut",
					}}
				>
					{content.title}
				</motion.h2>

				{/* Top Section - Two Feature Cards */}
				{content.topCards &&
					content.topCards.length > 0 && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
							{content.topCards.map(
								(
									card,
									index
								) => (
									<motion.div
										key={
											index
										}
										className={`${
											index ===
											0
												? "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
												: "bg-white relative overflow-hidden"
										} rounded-2xl p-8 md:p-10 shadow-sm`}
										initial={{
											opacity: 0,
											y: 20,
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
											delay:
												0.1 *
												(index +
													1),
											ease: "easeOut",
										}}
									>
										{index ===
											1 && (
											<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-100 via-gray-50 to-transparent opacity-50 rounded-full blur-2xl"></div>
										)}
										<h3 className="text-2xl md:text-3xl font-semibold text-blackbrown mb-4 font-cal-sans relative z-10">
											{
												card.title
											}
										</h3>
										<p className="text-base md:text-lg text-blackbrown/80 leading-relaxed font-light relative z-10">
											{
												card.description
											}
										</p>
									</motion.div>
								)
							)}
						</div>
					)}

				{/* Middle Section - Custom API Card */}
				{content.customApi && (
					<motion.div
						className="bg-black rounded-2xl p-8 md:p-12 mb-8 shadow-lg"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{
							opacity: 1,
							y: 0,
						}}
						viewport={{ once: true }}
						transition={{
							duration: 0.6,
							delay: 0.3,
							ease: "easeOut",
						}}
					>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
							{/* Left side - Content */}
							<div>
								<div className="flex items-center gap-3 mb-4">
									<h3 className="text-2xl md:text-3xl font-semibold text-white font-cal-sans">
										{
											content
												.customApi
												.title
										}
									</h3>
									<span className="bg-white/90 text-blackbrown text-sm font-bold px-3 py-1 rounded-md">
										{
											content
												.customApi
												.badge
										}
									</span>
								</div>
								<p className="text-base md:text-lg text-white/90 leading-relaxed font-light mb-6">
									{
										content
											.customApi
											.description
									}
								</p>
								<CustomButton
									text={
										content
											.customApi
											.buttonText
									}
									href={
										content
											.customApi
											.buttonLink
									}
									textColor="black"
									borderColor="black"
								/>
							</div>
							{/* Right side - Can add visual element here if needed */}
							<div className="hidden lg:block"></div>
						</div>
					</motion.div>
				)}

				{/* Bottom Section - Maximum customization and control */}
				{content.maximumCustomization && (
					<motion.div
						className="bg-gradient-to-br from-blackbrown to-black rounded-2xl p-8 md:p-12 shadow-lg"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{
							opacity: 1,
							y: 0,
						}}
						viewport={{ once: true }}
						transition={{
							duration: 0.6,
							delay: 0.4,
							ease: "easeOut",
						}}
					>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
							{/* Left Column */}
							<div>
								<h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 font-cal-sans">
									{
										content
											.maximumCustomization
											.title
									}
								</h3>
								<p className="text-base md:text-lg text-white/90 leading-relaxed font-light mb-6">
									{
										content
											.maximumCustomization
											.description
									}
								</p>
								<CustomButton
									text={
										content
											.maximumCustomization
											.buttonText
									}
									href={
										content
											.maximumCustomization
											.buttonLink
									}
									textColor="black"
									borderColor="black"
								/>
							</div>

							{/* Right Column - Bullet Points */}
							{content
								.maximumCustomization
								.features &&
								content
									.maximumCustomization
									.features
									.length >
									0 && (
									<div className="space-y-6">
										{content.maximumCustomization.features.map(
											(
												feature,
												index
											) => (
												<div
													key={
														index
													}
												>
													<h4 className="text-xl font-semibold text-white mb-2 font-cal-sans flex items-center gap-2">
														<span className="w-2 h-2 bg-yellow rounded-full"></span>
														{
															feature.title
														}
													</h4>
													<p className="text-base text-white/90 leading-relaxed font-light">
														{
															feature.description
														}
													</p>
												</div>
											)
										)}
									</div>
								)}
						</div>
					</motion.div>
				)}
			</div>
		</section>
	)
}
