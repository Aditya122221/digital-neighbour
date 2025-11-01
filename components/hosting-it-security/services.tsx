"use client"

import { motion } from "framer-motion"
import { CustomButton } from "@/components/core/button"

interface HostingServicesProps {
	data?: string
	serviceCards?: any[]
	basePath?: string
}

export default function HostingServices({
	data,
	serviceCards,
	basePath = "#",
}: HostingServicesProps) {
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
					Premium cloud hosting services
				</motion.h2>

				{/* Top Section - Two Feature Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
					{/* Card 1: Rock-solid reliability */}
					<motion.div
						className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 md:p-10 shadow-sm"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{
							opacity: 1,
							y: 0,
						}}
						viewport={{ once: true }}
						transition={{
							duration: 0.6,
							delay: 0.1,
							ease: "easeOut",
						}}
					>
						<h3 className="text-2xl md:text-3xl font-semibold text-blackbrown mb-4 font-cal-sans">
							Rock-solid reliability
						</h3>
						<p className="text-base md:text-lg text-blackbrown/80 leading-relaxed font-light">
							Confidently deploy and
							back up workloads with
							enterprise-grade nodes
							and redundant networking
							and storage.
						</p>
					</motion.div>

					{/* Card 2: Instant scalability */}
					<motion.div
						className="bg-white rounded-2xl p-8 md:p-10 shadow-sm relative overflow-hidden"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{
							opacity: 1,
							y: 0,
						}}
						viewport={{ once: true }}
						transition={{
							duration: 0.6,
							delay: 0.2,
							ease: "easeOut",
						}}
					>
						<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-100 via-gray-50 to-transparent opacity-50 rounded-full blur-2xl"></div>
						<h3 className="text-2xl md:text-3xl font-semibold text-blackbrown mb-4 font-cal-sans relative z-10">
							Instant scalability
						</h3>
						<p className="text-base md:text-lg text-blackbrown/80 leading-relaxed font-light relative z-10">
							In one click, increase
							or decrease your cloud
							hosting resources as
							needed to maintain
							optimal performance.
						</p>
					</motion.div>
				</div>

				{/* Middle Section - Custom API Card */}
				<motion.div
					className="bg-black rounded-2xl p-8 md:p-12 mb-8 shadow-lg"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
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
									Custom
								</h3>
								<span className="bg-white/90 text-blackbrown text-sm font-bold px-3 py-1 rounded-md">
									API
								</span>
							</div>
							<p className="text-base md:text-lg text-white/90 leading-relaxed font-light mb-6">
								A robust API,
								Terraform
								provider, and
								WHMCS plugin
								allow easy
								integration and
								automation
								across our cloud
								hosting
								platform.
							</p>
							<CustomButton
								text="Learn more"
								href="https://api.liquidweb.com/docs"
								textColor="black"
								borderColor="black"
							/>
						</div>
						{/* Right side - Can add visual element here if needed */}
						<div className="hidden lg:block"></div>
					</div>
				</motion.div>

				{/* Bottom Section - Maximum customization and control */}
				<motion.div
					className="bg-gradient-to-br from-blackbrown to-black rounded-2xl p-8 md:p-12 shadow-lg"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
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
								Maximum
								customization
								and control
							</h3>
							<p className="text-base md:text-lg text-white/90 leading-relaxed font-light mb-6">
								A robust API,
								Terraform
								provider, and
								WHMCS plugin
								allow easy
								integration and
								automation
								across our cloud
								hosting
								platform.
							</p>
							<CustomButton
								text="Explore cloud servers"
								href="#plans"
								textColor="black"
								borderColor="black"
							/>
						</div>

						{/* Right Column - Bullet Points */}
						<div className="space-y-6">
							<div>
								<h4 className="text-xl font-semibold text-white mb-2 font-cal-sans flex items-center gap-2">
									<span className="w-2 h-2 bg-yellow rounded-full"></span>
									Management
									options
								</h4>
								<p className="text-base text-white/90 leading-relaxed font-light">
									Different
									levels
									of
									management
									and
									optional
									control
									panel
									licenses
									mean you
									aren't
									locked
									into
									services
									and
									features
									that
									don't
									make
									sense
									for you.
								</p>
							</div>

							<div>
								<h4 className="text-xl font-semibold text-white mb-2 font-cal-sans flex items-center gap-2">
									<span className="w-2 h-2 bg-yellow rounded-full"></span>
									Server
									oversight
								</h4>
								<p className="text-base text-white/90 leading-relaxed font-light">
									Root
									access
									and our
									portal's
									management
									tools
									give you
									full
									server
									control.
								</p>
							</div>

							<div>
								<h4 className="text-xl font-semibold text-white mb-2 font-cal-sans flex items-center gap-2">
									<span className="w-2 h-2 bg-yellow rounded-full"></span>
									Linux
									and
									Windows
									distros
								</h4>
								<p className="text-base text-white/90 leading-relaxed font-light">
									We
									support
									AlmaLinux,
									Rocky
									Linux,
									Ubuntu,
									and
									Windows
									2019 and
									2022.
								</p>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	)
}
