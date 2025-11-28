"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Rocket, Network, BarChart3, Gauge, Zap } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface Tab {
	id: string
	label: string
	icon: React.ComponentType<{ className?: string }>
	video: string
}

const tabs: Tab[] = [
	{
		id: "Deploy",
		label: "Deploy",
		icon: Rocket,
		video: "/hostingVideo.mp4",
	},
	{
		id: "Network",
		label: "Network",
		icon: Network,
		video: "/hostingVideo.mp4", // Update with specific video
	},
	{
		id: "Scale",
		label: "Scale",
		icon: BarChart3,
		video: "/hostingVideo.mp4", // Update with specific video
	},
	{
		id: "Monitor",
		label: "Monitor",
		icon: Gauge,
		video: "/hostingVideo.mp4", // Update with specific video
	},
	{
		id: "Evolve",
		label: "Evolve",
		icon: Zap,
		video: "/hostingVideo.mp4", // Update with specific video
	},
]

export default function HostingProcess() {
	const [activeTabIndex, setActiveTabIndex] = useState(0)
	const [isAutoPlaying, setIsAutoPlaying] = useState(true)
	const videoRef = useRef<HTMLVideoElement>(null)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)
	const isMobile = useIsMobile()

	// Auto-rotate tabs every 4 seconds
	useEffect(() => {
		if (isAutoPlaying) {
			intervalRef.current = setInterval(() => {
				setActiveTabIndex(
					(prev) => (prev + 1) % tabs.length
				)
			}, 4000)
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [isAutoPlaying])

	// Reset video when tab changes
	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.load()
			videoRef.current.play().catch(() => {
				// Handle autoplay restrictions
			})
		}
	}, [activeTabIndex])

	const handleTabClick = (index: number) => {
		setActiveTabIndex(index)
		setIsAutoPlaying(false)
		// Resume auto-play after 10 seconds
		setTimeout(() => {
			setIsAutoPlaying(true)
		}, 10000)
	}

	const activeTab = tabs[activeTabIndex]

	return (
		<section className="relative min-h-screen bg-[#5D50EB] overflow-hidden">
			{/* Dotted pattern background */}
			<div
				className="absolute inset-0 opacity-20"
				style={{
					backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
					backgroundSize: "20px 20px",
				}}
			/>

			<div className="relative z-10">
				{/* Navigation Tabs */}
				<div className="px-4 sm:px-6 py-6 sm:py-8">
					<div className="max-w-7xl mx-auto">
						<div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 lg:gap-12 mb-4 sm:mb-6 overflow-x-auto scrollbar-hide">
							{tabs.map(
								(
									tab,
									index
								) => {
									const Icon =
										tab.icon
									const isActive =
										index ===
										activeTabIndex
									return (
										<div
											key={
												tab.id
											}
											className="flex flex-col items-center gap-2 sm:gap-3 flex-shrink-0"
										>
											<button
												onClick={() =>
													handleTabClick(
														index
													)
												}
												className={`flex flex-col items-center gap-1 sm:gap-2 transition-all duration-300 ${
													isActive
														? "text-white scale-105 sm:scale-110"
														: "text-white/60 hover:text-white/80"
												}`}
											>
												<Icon
													className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-all duration-300 ${
														isActive
															? "text-white"
															: ""
													}`}
												/>
												<span className="text-xs sm:text-sm font-medium whitespace-nowrap">
													{
														tab.label
													}
												</span>
											</button>
											{/* Individual line under each button */}
											<motion.div
												className={`w-full rounded-full transition-all duration-300 ${
													isActive
														? "bg-[#0e0e59]"
														: "bg-white/20"
												}`}
												initial={{
													height: "1px",
												}}
												animate={{
													height: isActive
														? isMobile
															? "3px"
															: "4px"
														: "1px",
												}}
												transition={{
													duration: 0.3,
													ease: "easeInOut",
												}}
											/>
										</div>
									)
								}
							)}
						</div>
					</div>
				</div>

				{/* Video Section */}
				<div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] overflow-hidden">
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTabIndex}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{
								duration: 0.5,
							}}
							className="absolute inset-0"
						>
							<video
								ref={videoRef}
								className="w-full h-full object-cover"
								autoPlay
								loop
								muted
								playsInline
							>
								<source
									src={
										activeTab.video
									}
									type="video/mp4"
								/>
								Your browser
								does not support
								the video tag.
							</video>
							{/* Overlay gradient */}
							<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</section>
	)
}
