import type { Metadata } from "next"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import ContactForm from "@/components/commonSections/contact-form"
import { getContactPageData } from "@/lib/contact-data"
import Image from "next/image"

export async function generateMetadata(): Promise<Metadata> {
	const contactData = await getContactPageData()
	return {
		title:
			contactData.metadata?.title ||
			"Contact Us - Digital Neighbour",
		description: contactData.metadata?.description || "",
	}
}

export default async function ContactPage() {
	const contactData = await getContactPageData()
	const { hero, form } = contactData

	return (
		<main className="flex min-h-screen w-full flex-col bg-[#0e0e59]">
			<div className="relative">
				<Navbar />
			</div>

			{/* Main Content Section */}
			<section
				className="relative mx-auto w-full max-w-7xl px-4 py-16 md:py-24"
				style={{ overflow: "hidden" }}
			>
				<div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2">
					{/* Left Column - Information Section */}
					{hero && (
						<div className="flex flex-col space-y-8">
							{/* Heading with highlighted word */}
							<h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
								{hero.heading ||
									""}{" "}
								{hero.highlightWord && (
									<span className="text-[#ffbe11]">
										{
											hero.highlightWord
										}
									</span>
								)}{" "}
								{hero.headingSuffix ||
									""}
							</h1>

							{/* Presenter Information */}
							{hero.presenter && (
								<div className="flex items-center gap-4">
									{hero
										.presenter
										.image && (
										<div className="relative h-16 w-20 overflow-hidden rounded-2xl">
											<Image
												src={
													hero
														.presenter
														.image
												}
												alt={
													hero
														.presenter
														.name ||
													"Presenter"
												}
												fill
												className="object-cover"
											/>
										</div>
									)}
									<div>
										<p className="text-base text-white">
											with{" "}
											{hero
												.presenter
												.name && (
												<span className="font-semibold">
													{
														hero
															.presenter
															.name
													}
												</span>
											)}
										</p>
										{hero
											.presenter
											.title && (
											<p className="text-sm text-[#ffbe11]">
												{
													hero
														.presenter
														.title
												}
											</p>
										)}
									</div>
								</div>
							)}

							{/* Benefits List */}
							{hero.benefits && (
								<div className="mt-8">
									{hero
										.benefits
										.title && (
										<h2 className="mb-6 text-lg font-semibold text-white">
											{
												hero
													.benefits
													.title
											}
										</h2>
									)}
									{hero
										.benefits
										.items &&
										hero
											.benefits
											.items
											.length >
											0 && (
											<ul className="space-y-4">
												{hero.benefits.items.map(
													(
														benefit
													) => (
														<li
															key={
																benefit.id
															}
															className="flex items-start gap-3"
														>
															{benefit.icon && (
																<div className="relative mt-1 h-6 w-6 flex-shrink-0">
																	<Image
																		src={
																			benefit.icon
																		}
																		alt=""
																		fill
																		className="object-contain"
																	/>
																</div>
															)}
															{benefit.text && (
																<span className="text-base text-white">
																	{
																		benefit.text
																	}
																</span>
															)}
														</li>
													)
												)}
											</ul>
										)}
								</div>
							)}
						</div>
					)}

					{/* Right Column - Contact Form */}
					<div className="lg:pl-8">
						{form && (
							<ContactForm
								formData={form}
							/>
						)}
					</div>
				</div>
			</section>

			<Footer />
		</main>
	)
}
