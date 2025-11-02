"use client"

import { motion } from "framer-motion"
import { CustomButton } from "@/components/core/button"

// Helper component to extract and animate line transforms
const AnimatedLineGroup = ({
	children,
	transform,
	delay = 0,
}: {
	children: React.ReactNode
	transform: string
	delay?: number
}) => {
	// Extract scaleX from matrix transform: "matrix(scaleX,0,0,1,x,y)"
	const match = transform.match(/matrix\(([0-9.]+),/)
	const scaleX = match ? parseFloat(match[1]) : 1

	// Get position from transform
	const posMatch = transform.match(
		/matrix\([^,]+,0,0,1,([0-9.]+),([0-9.]+)\)/
	)
	const x = posMatch ? parseFloat(posMatch[1]) : 0
	const y = posMatch ? parseFloat(posMatch[2]) : 0

	// Create unique ID for clipPath based on position and delay
	const clipId = `line-clip-${x}-${y}-${delay}`.replace(/[^a-zA-Z0-9-]/g, "-")

	// Calculate width based on scaleX - lines are typically 45 units wide, scaled
	const baseWidth = 45
	const animatedWidth = baseWidth * scaleX

	return (
		<g transform={`translate(${x}, ${y})`}>
			<defs>
				<clipPath id={clipId} clipPathUnits="userSpaceOnUse">
					<motion.rect
						initial={{ width: 0 }}
						animate={{
							width: [0, animatedWidth, animatedWidth, 0],
						}}
						transition={{
							duration: 3,
							delay: delay,
							repeat: Infinity,
							repeatDelay: 0.3,
							ease: [0.4, 0, 0.2, 1],
							times: [0, 0.5, 0.5, 1],
						}}
						height="100"
						x="-22.5"
						y="-50"
					/>
				</clipPath>
			</defs>
			<g clipPath={`url(#${clipId})`}>
				{children}
			</g>
		</g>
	)
}

interface HostingHeroProps {
	data: {
		heading: string
		subheading: string
	}
}

export default function HostingHero({ data }: HostingHeroProps) {
	return (
		<section className="relative pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32 overflow-x-hidden bg-gradient-to-br from-black via-black to-yellow">
			<div className="relative grid-rows-9 pb-40 lg:grid lg:grid-cols-16 lg:border-b-1 lg:pb-0">
				<div className="absolute right-0 top-0 z-[0] hidden h-full w-full overflow-hidden lg:block">
					<svg
						className="absolute right-[-2px] top-[-2px] h-[calc(100%+4px)] w-auto"
						width="722"
						height="812"
						viewBox="0 0 722 812"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						{[...Array(8)].map((_, row) =>
							[...Array(7)].map(
								(_, col) => (
									<rect
										key={`${row}-${col}`}
										x={
											91 +
											col *
												90
										}
										y={
											1 +
											row *
												90
										}
										width="90"
										height="90"
										className="stroke-gray-300 dark:stroke-gray-700"
									/>
								)
							)
						)}
					</svg>
				</div>
				<div className="relative z-[2] col-span-10 col-start-2 row-span-8 row-start-2 flex flex-col items-start gap-6 p-6 pb-0 pt-12 lg:gap-8 lg:pb-6 lg:pt-6">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight font-cal-sans text-white w-[80%] max-w-[600px]">
						{data.heading}
					</h1>
					<p className="text-lg md:text-xl text-white/80 leading-relaxed w-full max-w-[600px] lg:w-[80%]">
						{data.subheading}
					</p>
					<div className="flex w-full flex-col items-start gap-4 md:flex-row md:gap-6 lg:pt-8">
						<CustomButton
							text="Get Started for Free"
							href="#contact"
							textColor="black"
							borderColor="black"
							className="mt-6"
						/>
						<CustomButton
							text="Contact Sales"
							href="/contact"
							textColor="black"
							borderColor="black"
							className="mt-6"
						/>
					</div>
				</div>
				<div className="absolute inset-0 z-[1] hidden h-full w-full grid-cols-16 grid-rows-9 lg:grid">
					<div className="relative col-span-6 col-start-10 row-span-7 row-start-2">
						<div
							className="dotlottie-container main relative h-full w-full"
							lang="en"
						>
							<div
								data-name="data"
								role="figure"
								className="animation"
								style={{
									position: "relative",
									width: "100%",
									height: "100%",
									backgroundColor:
										"transparent",
								}}
							>
								{/* Lottie animation SVG would go here */}
								<div className="w-full h-full flex items-center justify-center text-white/50">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										xmlnsXlink="http://www.w3.org/1999/xlink"
										viewBox="0 0 1080 1260"
										width="1080"
										height="1260"
										preserveAspectRatio="xMidYMid meet"
										style={{
											width: "100%",
											height: "100%",
											transform: "translate3d(0px, 0px, 0px)",
											contentVisibility:
												"visible",
										}}
									>
										<defs>
											<clipPath id="__lottie_element_1235">
												<rect
													width="1080"
													height="1260"
													x="0"
													y="0"
												></rect>
											</clipPath>
											<clipPath id="__lottie_element_1237">
												<path d="M0,0 L1440,0 L1440,1440 L0,1440z"></path>
											</clipPath>
											<clipPath id="__lottie_element_1241">
												<path d="M0,0 L540,0 L540,540 L0,540z"></path>
											</clipPath>
											<g id="__lottie_element_1244">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,794.6448974609375,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1244_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1244"></use>
											</mask>
											<g id="__lottie_element_1250">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,794.6448974609375,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1250_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1250"></use>
											</mask>
											<g id="__lottie_element_1256">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,794.6448974609375,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1256_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1256"></use>
											</mask>
											<g id="__lottie_element_1262">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,794.6448974609375,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1262_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1262"></use>
											</mask>
											<g id="__lottie_element_1268">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,794.6448974609375,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1268_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1268"></use>
											</mask>
											<g id="__lottie_element_1274">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,794.6448974609375,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1274_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1274"></use>
											</mask>
											<clipPath id="__lottie_element_1284">
												<path d="M0,0 L540,0 L540,540 L0,540z"></path>
											</clipPath>
											<g id="__lottie_element_1287">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1287_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1287"></use>
											</mask>
											<g id="__lottie_element_1293">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1293_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1293"></use>
											</mask>
											<g id="__lottie_element_1299">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1299_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1299"></use>
											</mask>
											<g id="__lottie_element_1305">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1305_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1305"></use>
											</mask>
											<clipPath id="__lottie_element_1315">
												<path d="M0,0 L540,0 L540,540 L0,540z"></path>
											</clipPath>
											<g id="__lottie_element_1318">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1318_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1318"></use>
											</mask>
											<g id="__lottie_element_1324">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1324_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1324"></use>
											</mask>
											<g id="__lottie_element_1330">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1330_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1330"></use>
											</mask>
											<g id="__lottie_element_1336">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1336_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1336"></use>
											</mask>
											<g id="__lottie_element_1342">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1342_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1342"></use>
											</mask>
											<g id="__lottie_element_1348">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1348_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1348"></use>
											</mask>
											<g id="__lottie_element_1354">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1354_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1354"></use>
											</mask>
											<clipPath id="__lottie_element_1364">
												<path d="M0,0 L540,0 L540,540 L0,540z"></path>
											</clipPath>
											<g id="__lottie_element_1367">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,664.509765625,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1367_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1367"></use>
											</mask>
											<g id="__lottie_element_1373">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,664.509765625,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1373_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1373"></use>
											</mask>
											<g id="__lottie_element_1379">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,664.509765625,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1379_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1379"></use>
											</mask>
											<g id="__lottie_element_1385">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,664.509765625,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1385_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1385"></use>
											</mask>
											<g id="__lottie_element_1391">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,664.509765625,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1391_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1391"></use>
											</mask>
											<g id="__lottie_element_1397">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,664.509765625,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1397_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1397"></use>
											</mask>
											<g id="__lottie_element_1403">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,664.509765625,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1403_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1403"></use>
											</mask>
											<g id="__lottie_element_1409">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,664.509765625,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1409_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1409"></use>
											</mask>
											<g id="__lottie_element_1415">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,664.509765625,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1415_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1415"></use>
											</mask>
											<g id="__lottie_element_1421">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,664.509765625,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1421_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1421"></use>
											</mask>
											<clipPath id="__lottie_element_1431">
												<path d="M0,0 L540,0 L540,540 L0,540z"></path>
											</clipPath>
											<g id="__lottie_element_1434">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1434_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1434"></use>
											</mask>
											<g id="__lottie_element_1440">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1440_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1440"></use>
											</mask>
											<g id="__lottie_element_1446">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1446_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1446"></use>
											</mask>
											<g id="__lottie_element_1452">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1452_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1452"></use>
											</mask>
											<g id="__lottie_element_1458">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1458_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1458"></use>
											</mask>
											<clipPath id="__lottie_element_1468">
												<path d="M0,0 L540,0 L540,540 L0,540z"></path>
											</clipPath>
											<g id="__lottie_element_1471">
												<g
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
													style={{
														display: "block",
													}}
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1471_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1471"></use>
											</mask>
											<g id="__lottie_element_1477">
												<g
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
													style={{
														display: "block",
													}}
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1477_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1477"></use>
											</mask>
											<clipPath id="__lottie_element_1487">
												<path d="M0,0 L540,0 L540,540 L0,540z"></path>
											</clipPath>
											<g id="__lottie_element_1490">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1490_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1490"></use>
											</mask>
											<g id="__lottie_element_1496">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1496_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1496"></use>
											</mask>
											<g id="__lottie_element_1502">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1502_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1502"></use>
											</mask>
											<clipPath id="__lottie_element_1512">
												<path d="M0,0 L540,0 L540,540 L0,540z"></path>
											</clipPath>
											<g id="__lottie_element_1515">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1515_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1515"></use>
											</mask>
											<g id="__lottie_element_1521">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1521_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1521"></use>
											</mask>
											<g id="__lottie_element_1527">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1527_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1527"></use>
											</mask>
											<clipPath id="__lottie_element_1537">
												<path d="M0,0 L540,0 L540,540 L0,540z"></path>
											</clipPath>
											<g id="__lottie_element_1540">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1540_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1540"></use>
											</mask>
											<g id="__lottie_element_1546">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1546_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1546"></use>
											</mask>
											<g id="__lottie_element_1552">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1552_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1552"></use>
											</mask>
											<g id="__lottie_element_1558">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1558_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1558"></use>
											</mask>
											<g id="__lottie_element_1564">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1564_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1564"></use>
											</mask>
											<g id="__lottie_element_1570">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1570_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1570"></use>
											</mask>
											<g id="__lottie_element_1576">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1576_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1576"></use>
											</mask>
											<g id="__lottie_element_1582">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1582_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1582"></use>
											</mask>
											<clipPath id="__lottie_element_1592">
												<path d="M0,0 L540,0 L540,540 L0,540z"></path>
											</clipPath>
											<g id="__lottie_element_1595">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1595_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1595"></use>
											</mask>
											<g id="__lottie_element_1601">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1601_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1601"></use>
											</mask>
											<g id="__lottie_element_1607">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1607_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1607"></use>
											</mask>
											<g id="__lottie_element_1613">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1613_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1613"></use>
											</mask>
											<g id="__lottie_element_1619">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1619_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1619"></use>
											</mask>
											<g id="__lottie_element_1625">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1625_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1625"></use>
											</mask>
											<g id="__lottie_element_1631">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1631_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1631"></use>
											</mask>
											<g id="__lottie_element_1637">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1637_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1637"></use>
											</mask>
											<clipPath id="__lottie_element_1647">
												<path d="M0,0 L540,0 L540,540 L0,540z"></path>
											</clipPath>
											<g id="__lottie_element_1650">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1650_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1650"></use>
											</mask>
											<g id="__lottie_element_1656">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1656_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1656"></use>
											</mask>
											<g id="__lottie_element_1662">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1662_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1662"></use>
											</mask>
											<clipPath id="__lottie_element_1672">
												<path d="M0,0 L540,0 L540,540 L0,540z"></path>
											</clipPath>
											<g id="__lottie_element_1675">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1675_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1675"></use>
											</mask>
											<g id="__lottie_element_1681">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1681_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1681"></use>
											</mask>
											<g id="__lottie_element_1687">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1687_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1687"></use>
											</mask>
											<g id="__lottie_element_1693">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1693_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1693"></use>
											</mask>
											<g id="__lottie_element_1699">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1699_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1699"></use>
											</mask>
											<g id="__lottie_element_1705">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1705_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1705"></use>
											</mask>
											<g id="__lottie_element_1711">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1711_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1711"></use>
											</mask>
											<g id="__lottie_element_1717">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1717_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1717"></use>
											</mask>
											<g id="__lottie_element_1723">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1723_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1723"></use>
											</mask>
											<clipPath id="__lottie_element_1733">
												<path d="M0,0 L540,0 L540,540 L0,540z"></path>
											</clipPath>
											<g id="__lottie_element_1736">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1736_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1736"></use>
											</mask>
											<g id="__lottie_element_1742">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1742_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1742"></use>
											</mask>
											<g id="__lottie_element_1748">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1748_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1748"></use>
											</mask>
											<g id="__lottie_element_1754">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1754_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1754"></use>
											</mask>
											<g id="__lottie_element_1760">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1760_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1760"></use>
											</mask>
											<g id="__lottie_element_1766">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1766_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1766"></use>
											</mask>
											<g id="__lottie_element_1772">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1772_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1772"></use>
											</mask>
											<g id="__lottie_element_1778">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1778_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1778"></use>
											</mask>
											<g id="__lottie_element_1784">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1784_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1784"></use>
											</mask>
											<g id="__lottie_element_1790">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1790_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1790"></use>
											</mask>
											<clipPath id="__lottie_element_1800">
												<path d="M0,0 L540,0 L540,540 L0,540z"></path>
											</clipPath>
											<g id="__lottie_element_1803">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1803_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1803"></use>
											</mask>
											<g id="__lottie_element_1809">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1809_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1809"></use>
											</mask>
											<g id="__lottie_element_1815">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1815_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1815"></use>
											</mask>
											<g id="__lottie_element_1821">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1821_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1821"></use>
											</mask>
											<g id="__lottie_element_1827">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1827_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1827"></use>
											</mask>
											<g id="__lottie_element_1833">
												<g
													style={{
														display: "block",
													}}
													transform="matrix(1,0,0,1,811,270)"
													opacity="1"
												>
													<g
														opacity="1"
														transform="matrix(6,0,0,6,0,0)"
													>
														<path
															fill="rgb(0,0,0)"
															fillOpacity="1"
															d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
														></path>
													</g>
												</g>
											</g>
											<mask
												id="__lottie_element_1833_1"
												maskType="alpha"
											>
												<use xlinkHref="#__lottie_element_1833"></use>
											</mask>
										</defs>
										<g clipPath="url(#__lottie_element_1235)">
											<g
												clipPath="url(#__lottie_element_1237)"
												transform="matrix(1,0,0,1,0,-179.5)"
												opacity="1"
												style={{
													display: "block",
												}}
											>
												<g
													clipPath="url(#__lottie_element_1800)"
													style={{
														display: "none",
													}}
													transform="matrix(0.33500000834465027,0,0,0.33500000834465027,539.5499877929688,179.04998779296875)"
													opacity="1"
												>
													<g
														transform="matrix(1,0,0,1,811,270)"
														opacity="1"
														style={{
															display: "block",
														}}
													>
														<g
															opacity="1"
															transform="matrix(6,0,0,6,0,0)"
														>
															<path
																fill="rgb(26,26,26)"
																fillOpacity="1"
																d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
															></path>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1833_1)"
														style={{
															display: "block",
														}}
													>
														<AnimatedLineGroup
															transform="matrix(1,0,0,1,135,330)"
															delay={
																0
															}
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</AnimatedLineGroup>
													</g>
													<g
														mask="url(#__lottie_element_1827_1)"
														style={{
															display: "block",
														}}
													>
														<AnimatedLineGroup
															transform="matrix(1,0,0,1,405,270)"
															delay={
																0.1
															}
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</AnimatedLineGroup>
													</g>
													<g
														mask="url(#__lottie_element_1821_1)"
														style={{
															display: "block",
														}}
													>
														<AnimatedLineGroup
															transform="matrix(3.9600000381469727,0,0,1,405,345.5)"
															delay={
																0.2
															}
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</AnimatedLineGroup>
													</g>
													<g
														mask="url(#__lottie_element_1815_1)"
														style={{
															display: "block",
														}}
													>
														<AnimatedLineGroup
															transform="matrix(1,0,0,1,135,150)"
															delay={
																0.3
															}
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</AnimatedLineGroup>
													</g>
													<g
														mask="url(#__lottie_element_1809_1)"
														style={{
															display: "block",
														}}
													>
														<AnimatedLineGroup
															transform="matrix(1,0,0,1,135,225)"
															delay={
																0.4
															}
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</AnimatedLineGroup>
													</g>
													<g
														mask="url(#__lottie_element_1803_1)"
														style={{
															display: "block",
														}}
													>
														<AnimatedLineGroup
															transform="matrix(1,0,0,1,270,450)"
															delay={
																0.5
															}
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M45,-5 C45,-5 -45,-5 -45,-5 C-45,-5 -45,5 -45,5 C-45,5 45,5 45,5 C45,5 45,-5 45,-5z"
																></path>
															</g>
														</AnimatedLineGroup>
													</g>
												</g>
												<g
													clipPath="url(#__lottie_element_1733)"
													style={{
														display: "none",
													}}
													transform="matrix(0.33500000834465027,0,0,0.33500000834465027,359.54998779296875,359.54998779296875)"
													opacity="1"
												>
													<g
														transform="matrix(1,0,0,1,811,270)"
														opacity="1"
														style={{
															display: "block",
														}}
													>
														<g
															opacity="1"
															transform="matrix(6,0,0,6,0,0)"
														>
															<path
																fill="rgb(26,26,26)"
																fillOpacity="1"
																d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
															></path>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1790_1)"
														style={{
															display: "block",
														}}
													>
														<AnimatedLineGroup
															transform="matrix(1,0,0,1,405,465)"
															delay={
																0.6
															}
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</AnimatedLineGroup>
													</g>
													<g
														mask="url(#__lottie_element_1784_1)"
														style={{
															display: "block",
														}}
													>
														<AnimatedLineGroup
															transform="matrix(1,0,0,1,405,405)"
															delay={
																0.7
															}
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</AnimatedLineGroup>
													</g>
													<g
														mask="url(#__lottie_element_1778_1)"
														style={{
															display: "block",
														}}
													>
														<AnimatedLineGroup
															transform="matrix(1,0,0,1,405,345)"
															delay={
																0.8
															}
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</AnimatedLineGroup>
													</g>
													<g
														mask="url(#__lottie_element_1772_1)"
														style={{
															display: "block",
														}}
													>
														<AnimatedLineGroup
															transform="matrix(1,0,0,1,135,30)"
															delay={
																0.9
															}
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</AnimatedLineGroup>
													</g>
													<g
														mask="url(#__lottie_element_1766_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,135,90)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1760_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1.100000023841858,0,0,1,405,30)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1754_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,135,255)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="#ffe031"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1748_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,135,315)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="#ffe031"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1742_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,135,195)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="#ffe031"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1736_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,405,150)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="#ffe031"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</g>
													</g>
												</g>
												<g
													clipPath="url(#__lottie_element_1672)"
													style={{
														display: "block",
													}}
													transform="matrix(0.33500000834465027,0,0,0.33500000834465027,899.5499877929688,359.54998779296875)"
													opacity="1"
												>
													<g
														transform="matrix(1,0,0,1,811,270)"
														opacity="1"
														style={{
															display: "block",
														}}
													>
														<g
															opacity="1"
															transform="matrix(6,0,0,6,0,0)"
														>
															<path
																fill="rgb(26,26,26)"
																fillOpacity="1"
																d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
															></path>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1723_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1.0199999809265137,135,525)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1717_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1.0199999809265137,135,345)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1711_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1.0199999809265137,135,465)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1705_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1.0199999809265137,405,435)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1699_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1.0199999809265137,405,255)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1693_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1.0199999809265137,405,165)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1687_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1.0199999809265137,135,285)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="#ffe031"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1681_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1.0199999809265137,135,405)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="#ffe031"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1675_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1.0199999809265137,405,375)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="#ffe031"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
												</g>
												<g
													clipPath="url(#__lottie_element_1647)"
													style={{
														display: "none",
													}}
													transform="matrix(0.33500000834465027,0,0,0.33500000834465027,359.54998779296875,539.5499877929688)"
													opacity="1"
												>
													<g
														transform="matrix(1,0,0,1,811,270)"
														opacity="1"
														style={{
															display: "block",
														}}
													>
														<g
															opacity="1"
															transform="matrix(6,0,0,6,0,0)"
														>
															<path
																fill="rgb(26,26,26)"
																fillOpacity="1"
																d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
															></path>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1662_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(-1,0,0,-1.0001599788665771,270,329.98077392578125)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M45,-5 C45,-5 -45,-5 -45,-5 C-45,-5 -45,5 -45,5 C-45,5 45,5 45,5 C45,5 45,-5 45,-5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1656_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(-1,0,0,-1,270,210)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M45,-5 C45,-5 -45,-5 -45,-5 C-45,-5 -45,5 -45,5 C-45,5 45,5 45,5 C45,5 45,-5 45,-5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1650_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(-1,0,0,-5.320000171661377,135,516.5)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</g>
													</g>
												</g>
												<g
													clipPath="url(#__lottie_element_1592)"
													style={{
														display: "none",
													}}
													transform="matrix(0.33500000834465027,0,0,0.33500000834465027,539.4299926757812,539.5499877929688)"
													opacity="1"
												>
													<g
														transform="matrix(1,0,0,1,811,270)"
														opacity="1"
														style={{
															display: "block",
														}}
													>
														<g
															opacity="1"
															transform="matrix(6,0,0,6,0,0)"
														>
															<path
																fill="rgb(26,26,26)"
																fillOpacity="1"
																d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
															></path>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1637_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,405,345)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1631_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,405,285)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1625_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(3.809999942779541,0,0,1,405,165)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1619_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,405,75)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1613_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,135,45)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1607_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,405,405)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1601_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,2.9600000381469727,135,508.80999755859375)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1595_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(3.119999885559082,0,0,1.0149999856948853,135,165)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="#ffe031"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
												</g>
												<g
													clipPath="url(#__lottie_element_1537)"
													style={{
														display: "none",
													}}
													transform="matrix(0.33500000834465027,0,0,0.33500000834465027,359.42999267578125,719.2999877929688)"
													opacity="1"
												>
													<g
														transform="matrix(1,0,0,1,811,270)"
														opacity="1"
														style={{
															display: "block",
														}}
													>
														<g
															opacity="1"
															transform="matrix(6,0,0,6,0,0)"
														>
															<path
																fill="rgb(26,26,26)"
																fillOpacity="1"
																d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
															></path>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1582_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,135,525)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1576_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,135,345)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1570_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,135,465)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1564_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,405,255)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1558_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,405,195)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1552_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,405,105)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1546_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,135,225)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="#ffe031"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1540_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,405,375)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="#ffe031"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
												</g>
												<g
													clipPath="url(#__lottie_element_1512)"
													style={{
														display: "none",
													}}
													transform="matrix(0.33500000834465027,0,0,0.33500000834465027,179.67999267578125,719.5499877929688)"
													opacity="1"
												>
													<g
														transform="matrix(1,0,0,1,811,270)"
														opacity="1"
														style={{
															display: "block",
														}}
													>
														<g
															opacity="1"
															transform="matrix(6,0,0,6,0,0)"
														>
															<path
																fill="rgb(26,26,26)"
																fillOpacity="1"
																d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
															></path>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1527_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(-1,0,0,-1,270,390)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M45,-5 C45,-5 -45,-5 -45,-5 C-45,-5 -45,5 -45,5 C-45,5 45,5 45,5 C45,5 45,-5 45,-5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1521_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(-1,0,0,-1,405,30)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1515_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(-1,0,0,-1,405,210)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="#ffe031"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</g>
													</g>
												</g>
												<g
													clipPath="url(#__lottie_element_1487)"
													style={{
														display: "none",
													}}
													transform="matrix(0.33500000834465027,0,0,0.33500000834465027,179.67999267578125,899.6799926757812)"
													opacity="1"
												>
													<g
														transform="matrix(1,0,0,1,811,270)"
														opacity="1"
														style={{
															display: "block",
														}}
													>
														<g
															opacity="1"
															transform="matrix(6,0,0,6,0,0)"
														>
															<path
																fill="rgb(26,26,26)"
																fillOpacity="1"
																d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
															></path>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1502_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,270,495)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M45,-7.5 C45,-7.5 -45,-7.5 -45,-7.5 C-45,-7.5 -45,7.5 -45,7.5 C-45,7.5 45,7.5 45,7.5 C45,7.5 45,-7.5 45,-7.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1496_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,270,313)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M45,-7.5 C45,-7.5 -45,-7.5 -45,-7.5 C-45,-7.5 -45,7.5 -45,7.5 C-45,7.5 45,7.5 45,7.5 C45,7.5 45,-7.5 45,-7.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1490_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,270,226)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M45,-7.5 C45,-7.5 -45,-7.5 -45,-7.5 C-45,-7.5 -45,7.5 -45,7.5 C-45,7.5 45,7.5 45,7.5 C45,7.5 45,-7.5 45,-7.5z"
																></path>
															</g>
														</g>
													</g>
												</g>
												<g
													clipPath="url(#__lottie_element_1468)"
													transform="matrix(0.33500000834465027,0,0,0.33500000834465027,-0.57000732421875,1079.800048828125)"
													opacity="1"
													style={{
														display: "none",
													}}
												>
													<g
														transform="matrix(1,0,0,1,811,270)"
														opacity="1"
														style={{
															display: "block",
														}}
													>
														<g
															opacity="1"
															transform="matrix(6,0,0,6,0,0)"
														>
															<path
																fill="rgb(26,26,26)"
																fillOpacity="1"
																d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
															></path>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1477_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,270,315)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M45,-7.5 C45,-7.5 -45,-7.5 -45,-7.5 C-45,-7.5 -45,7.5 -45,7.5 C-45,7.5 45,7.5 45,7.5 C45,7.5 45,-7.5 45,-7.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1471_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,270,495)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="#ffe031"
																	fillOpacity="1"
																	d=" M45,-7.5 C45,-7.5 -45,-7.5 -45,-7.5 C-45,-7.5 -45,7.5 -45,7.5 C-45,7.5 45,7.5 45,7.5 C45,7.5 45,-7.5 45,-7.5z"
																></path>
															</g>
														</g>
													</g>
												</g>
												<g
													clipPath="url(#__lottie_element_1431)"
													style={{
														display: "block",
													}}
													transform="matrix(0.33500000834465027,0,0,0.33500000834465027,719.4299926757812,719.5499877929688)"
													opacity="1"
												>
													<g
														transform="matrix(1,0,0,1,811,270)"
														opacity="1"
														style={{
															display: "block",
														}}
													>
														<g
															opacity="1"
															transform="matrix(6,0,0,6,0,0)"
														>
															<path
																fill="rgb(26,26,26)"
																fillOpacity="1"
																d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
															></path>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1458_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(-1,0,0,-1,135,90)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1452_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,135,330)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1446_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,135,210)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1440_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,405,510)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1434_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1.0099999904632568,405,270)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</g>
													</g>
												</g>
												<g
													clipPath="url(#__lottie_element_1364)"
													style={{
														display: "block",
													}}
													transform="matrix(0.33500000834465027,0,0,0.33500000834465027,899.4299926757812,899.5499877929688)"
													opacity="1"
												>
													<g
														transform="matrix(1,0,0,1,664.509765625,270)"
														opacity="1"
														style={{
															display: "block",
														}}
													>
														<g
															opacity="1"
															transform="matrix(6,0,0,6,0,0)"
														>
															<path
																fill="rgb(26,26,26)"
																fillOpacity="1"
																d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
															></path>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1421_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1.0149999856948853,0,0,1.0149999856948853,495,405)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M7.5,-7.5 C7.5,-7.5 -7.5,-7.5 -7.5,-7.5 C-7.5,-7.5 -7.5,7.5 -7.5,7.5 C-7.5,7.5 7.5,7.5 7.5,7.5 C7.5,7.5 7.5,-7.5 7.5,-7.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1415_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1.0149999856948853,0,0,1.0149999856948853,405,135)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M7.5,-7.5 C7.5,-7.5 -7.5,-7.5 -7.5,-7.5 C-7.5,-7.5 -7.5,7.5 -7.5,7.5 C-7.5,7.5 7.5,7.5 7.5,7.5 C7.5,7.5 7.5,-7.5 7.5,-7.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1409_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1.0149999856948853,0,0,1.0149999856948853,405,495)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M7.5,-7.5 C7.5,-7.5 -7.5,-7.5 -7.5,-7.5 C-7.5,-7.5 -7.5,7.5 -7.5,7.5 C-7.5,7.5 7.5,7.5 7.5,7.5 C7.5,7.5 7.5,-7.5 7.5,-7.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1403_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1.0149999856948853,0,0,1.0149999856948853,405,315)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M7.5,-7.5 C7.5,-7.5 -7.5,-7.5 -7.5,-7.5 C-7.5,-7.5 -7.5,7.5 -7.5,7.5 C-7.5,7.5 7.5,7.5 7.5,7.5 C7.5,7.5 7.5,-7.5 7.5,-7.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1397_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1.0149999856948853,0,0,1.0149999856948853,315,45)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M7.5,-7.5 C7.5,-7.5 -7.5,-7.5 -7.5,-7.5 C-7.5,-7.5 -7.5,7.5 -7.5,7.5 C-7.5,7.5 7.5,7.5 7.5,7.5 C7.5,7.5 7.5,-7.5 7.5,-7.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1391_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1.0149999856948853,0,0,1.0149999856948853,315,225)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M7.5,-7.5 C7.5,-7.5 -7.5,-7.5 -7.5,-7.5 C-7.5,-7.5 -7.5,7.5 -7.5,7.5 C-7.5,7.5 7.5,7.5 7.5,7.5 C7.5,7.5 7.5,-7.5 7.5,-7.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1385_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1.0149999856948853,0,0,1.0149999856948853,225,495)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M7.5,-7.5 C7.5,-7.5 -7.5,-7.5 -7.5,-7.5 C-7.5,-7.5 -7.5,7.5 -7.5,7.5 C-7.5,7.5 7.5,7.5 7.5,7.5 C7.5,7.5 7.5,-7.5 7.5,-7.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1379_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1.0149999856948853,0,0,1.0149999856948853,225,315)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M7.5,-7.5 C7.5,-7.5 -7.5,-7.5 -7.5,-7.5 C-7.5,-7.5 -7.5,7.5 -7.5,7.5 C-7.5,7.5 7.5,7.5 7.5,7.5 C7.5,7.5 7.5,-7.5 7.5,-7.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1373_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1.0149999856948853,0,0,1.0149999856948853,135,225)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M7.5,-7.5 C7.5,-7.5 -7.5,-7.5 -7.5,-7.5 C-7.5,-7.5 -7.5,7.5 -7.5,7.5 C-7.5,7.5 7.5,7.5 7.5,7.5 C7.5,7.5 7.5,-7.5 7.5,-7.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1367_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1.0149999856948853,0,0,1.0149999856948853,45,315)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M7.5,-7.5 C7.5,-7.5 -7.5,-7.5 -7.5,-7.5 C-7.5,-7.5 -7.5,7.5 -7.5,7.5 C-7.5,7.5 7.5,7.5 7.5,7.5 C7.5,7.5 7.5,-7.5 7.5,-7.5z"
																></path>
															</g>
														</g>
													</g>
												</g>
												<g
													clipPath="url(#__lottie_element_1315)"
													style={{
														display: "block",
													}}
													transform="matrix(0.33500000834465027,0,0,0.33500000834465027,539.4299926757812,899.5499877929688)"
													opacity="1"
												>
													<g
														transform="matrix(1,0,0,1,811,270)"
														opacity="1"
														style={{
															display: "block",
														}}
													>
														<g
															opacity="1"
															transform="matrix(6,0,0,6,0,0)"
														>
															<path
																fill="rgb(26,26,26)"
																fillOpacity="1"
																d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
															></path>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1354_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(-1,0,0,-1,405,225)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1348_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(-1,0,0,-1,405,345)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1342_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(-1,0,0,-1,405,285)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1336_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(-1,0,0,-1,135,510)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1330_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(-1,0,0,-1,135,390)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1324_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(-1,0,0,-1,135,195)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="#ffe031"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1318_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(-1,0,0,-1,405,450)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="#ffe031"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</g>
													</g>
												</g>
												<g
													clipPath="url(#__lottie_element_1284)"
													style={{
														display: "none",
													}}
													transform="matrix(0.33500000834465027,0,0,0.33500000834465027,359.42999267578125,899.4299926757812)"
													opacity="1"
												>
													<g
														transform="matrix(1,0,0,1,811,270)"
														opacity="1"
														style={{
															display: "block",
														}}
													>
														<g
															opacity="1"
															transform="matrix(6,0,0,6,0,0)"
														>
															<path
																fill="rgb(26,26,26)"
																fillOpacity="1"
																d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
															></path>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1305_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,0,0)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(1,0,0,1,0,0)"
															>
																<g
																	opacity="1"
																	transform="matrix(1.4500000476837158,0,0,1,135,525)"
																>
																	<g
																		opacity="1"
																		transform="matrix(6,0,0,6,0,0)"
																	>
																		<path
																			fill="rgb(255,255,255)"
																			fillOpacity="1"
																			d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																		></path>
																	</g>
																</g>
																<g
																	opacity="1"
																	transform="matrix(1.159999966621399,0,0,1,135,450)"
																>
																	<g
																		opacity="1"
																		transform="matrix(6,0,0,6,0,0)"
																	>
																		<path
																			fill="rgb(255,255,255)"
																			fillOpacity="1"
																			d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																		></path>
																	</g>
																</g>
																<g
																	opacity="1"
																	transform="matrix(1,0,0,3.200000047683716,405,516.0599975585938)"
																>
																	<g
																		opacity="1"
																		transform="matrix(6,0,0,6,0,0)"
																	>
																		<path
																			fill="rgb(255,255,255)"
																			fillOpacity="1"
																			d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																		></path>
																	</g>
																</g>
															</g>
															<g
																opacity="1"
																transform="matrix(1,0,0,1,0,1)"
															>
																<g
																	opacity="1"
																	transform="matrix(1,0,0,1,135,331)"
																>
																	<g
																		opacity="1"
																		transform="matrix(6,0,0,6,0,0)"
																	>
																		<path
																			fill="rgb(255,255,255)"
																			fillOpacity="1"
																			d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																		></path>
																	</g>
																</g>
																<g
																	opacity="1"
																	transform="matrix(1,0,0,1,135,390)"
																>
																	<g
																		opacity="1"
																		transform="matrix(6,0,0,6,0,0)"
																	>
																		<path
																			fill="rgb(255,255,255)"
																			fillOpacity="1"
																			d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																		></path>
																	</g>
																</g>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1299_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(-1,0,0,-1,135,90)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M22.5,-5 C22.5,-5 -22.5,-5 -22.5,-5 C-22.5,-5 -22.5,5 -22.5,5 C-22.5,5 22.5,5 22.5,5 C22.5,5 22.5,-5 22.5,-5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1293_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,135,405)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="#ffe031"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1287_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,135,465)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="#ffe031"
																	fillOpacity="1"
																	d=" M22.5,-2.5 C22.5,-2.5 -22.5,-2.5 -22.5,-2.5 C-22.5,-2.5 -22.5,2.5 -22.5,2.5 C-22.5,2.5 22.5,2.5 22.5,2.5 C22.5,2.5 22.5,-2.5 22.5,-2.5z"
																></path>
															</g>
														</g>
													</g>
												</g>
												<g
													clipPath="url(#__lottie_element_1241)"
													style={{
														display: "block",
													}}
													transform="matrix(0.33500000834465027,0,0,0.33500000834465027,719.4299926757812,1259.56005859375)"
													opacity="1"
												>
													<g
														transform="matrix(1,0,0,1,794.6448974609375,270)"
														opacity="1"
														style={{
															display: "block",
														}}
													>
														<g
															opacity="1"
															transform="matrix(6,0,0,6,0,0)"
														>
															<path
																fill="rgb(26,26,26)"
																fillOpacity="1"
																d=" M45,-45 C45,-45 45,45 45,45 C45,45 -45,45 -45,45 C-45,45 -45,-45 -45,-45 C-45,-45 45,-45 45,-45z"
															></path>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1274_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(2.990000009536743,0,0,1,45.5,405)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M7.5,-7.5 C7.5,-7.5 -7.5,-7.5 -7.5,-7.5 C-7.5,-7.5 -7.5,7.5 -7.5,7.5 C-7.5,7.5 7.5,7.5 7.5,7.5 C7.5,7.5 7.5,-7.5 7.5,-7.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1268_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1.0199999809265137,0,0,1.0199999809265137,405,315)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M7.5,-7.5 C7.5,-7.5 -7.5,-7.5 -7.5,-7.5 C-7.5,-7.5 -7.5,7.5 -7.5,7.5 C-7.5,7.5 7.5,7.5 7.5,7.5 C7.5,7.5 7.5,-7.5 7.5,-7.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1262_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,495,405)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M7.5,-7.5 C7.5,-7.5 -7.5,-7.5 -7.5,-7.5 C-7.5,-7.5 -7.5,7.5 -7.5,7.5 C-7.5,7.5 7.5,7.5 7.5,7.5 C7.5,7.5 7.5,-7.5 7.5,-7.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1256_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,315,405)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M7.5,-7.5 C7.5,-7.5 -7.5,-7.5 -7.5,-7.5 C-7.5,-7.5 -7.5,7.5 -7.5,7.5 C-7.5,7.5 7.5,7.5 7.5,7.5 C7.5,7.5 7.5,-7.5 7.5,-7.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1250_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,225,495)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="rgb(255,255,255)"
																	fillOpacity="1"
																	d=" M7.5,-7.5 C7.5,-7.5 -7.5,-7.5 -7.5,-7.5 C-7.5,-7.5 -7.5,7.5 -7.5,7.5 C-7.5,7.5 7.5,7.5 7.5,7.5 C7.5,7.5 7.5,-7.5 7.5,-7.5z"
																></path>
															</g>
														</g>
													</g>
													<g
														mask="url(#__lottie_element_1244_1)"
														style={{
															display: "block",
														}}
													>
														<g
															transform="matrix(1,0,0,1,225,135)"
															opacity="1"
														>
															<g
																opacity="1"
																transform="matrix(6,0,0,6,0,0)"
															>
																<path
																	fill="#ffe031"
																	fillOpacity="1"
																	d=" M7.5,-7.5 C7.5,-7.5 -7.5,-7.5 -7.5,-7.5 C-7.5,-7.5 -7.5,7.5 -7.5,7.5 C-7.5,7.5 7.5,7.5 7.5,7.5 C7.5,7.5 7.5,-7.5 7.5,-7.5z"
																></path>
															</g>
														</g>
													</g>
												</g>
											</g>
										</g>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
