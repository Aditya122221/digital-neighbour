import React from "react"
import webDevData from "@/data/web-development.json"
import WebDevHero from "@/components/web-development/hero"
import Functionalities from "@/components/web-development/functionalities"
import Content from "@/components/commonSections/content"
import Services from "@/components/commonSections/services"
import Form from "@/components/commonSections/form"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import Process2 from "@/components/homepage/process2"
import Cta from "@/components/commonSections/cta"
import Industries from "@/components/web-development/industries"
import OtherServices from "@/components/commonSections/otherservices"
import Faq from "@/components/commonSections/faq"
import CaseStudy from "@/components/homepage/casestudy"

export default function WebDevelopmentPage() {
	const currentData = (webDevData as any)["web-development"] as any

	return (
		<main>
			<div className="relative">
				<Navbar />
				<WebDevHero
					data={
						currentData?.hero || {
							heading: "High-Performance Web Development",
							subheading: "We design, build, and scale fast, secure, and conversion-focused websites and web apps.",
						}
					}
				/>
			</div>
			<Form data={currentData?.form} />
			<BrandsMarquee />
			<Functionalities />
			<Services
				data={currentData?.services}
				serviceCards={currentData?.serviceCards}
				basePath="/web-development"
			/>
			<Process2
				data={currentData?.services}
				processData={currentData?.process}
			/>
			<Content data={currentData?.content} imagePathPrefix="/seo/content" />
			<Industries />
			<CaseStudy />
			<OtherServices />
			<Faq data={currentData?.faq} />
			<Cta data={currentData?.services} />
			<Footer />
		</main>
	)
}
