import React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/site-metadata"
import { getWebDevelopmentServiceBySlug } from "@/lib/sanity-service-data"
import WebDevHero from "@/components/web-development/hero"
import IntroParagraph from "@/components/commonSections/introparagraph"
import PainPoints from "@/components/commonSections/painpoints"
import KeyBenefits from "@/components/commonSections/keybenefits"
import Features from "@/components/commonSections/features"
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

// Force dynamic rendering to always fetch fresh data from Sanity
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
	const webDevOverview = await getWebDevelopmentServiceBySlug("web-development")
	const webDevHeading =
		webDevOverview?.hero?.heading ?? "Web Development Services"
	const webDevDescription =
		webDevOverview?.hero?.subheading ??
		"Design and ship high-performing websites, web apps, and digital platforms with Digital Neighbour's full-stack web development team."

	return buildMetadata({
		title: webDevHeading,
		description: webDevDescription,
		path: "/web-development",
	})
}

export default async function WebDevelopmentPage() {
	const currentData = await getWebDevelopmentServiceBySlug("web-development")
	
	if (!currentData) {
		notFound()
	}

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
	< IntroParagraph data = { currentData?.introParagraph } />
	<PainPoints data={currentData?.painPoints} />
			<Functionalities />
			<Services
				data={currentData?.services}
				serviceCards={currentData?.serviceCards}
				basePath="/web-development"
					/>
	<Content data={ currentData?.content } imagePathPrefix = "/seo/content" />
		<Industries />
		<CaseStudy />
			<Process2
				data={currentData?.services}
				processData={currentData?.process}
					/>
					<KeyBenefits data={currentData?.keyBenefits} />
	< Features data = { currentData?.features } />
	<Faq data={currentData?.faq} />
			<OtherServices />
			<Cta data={currentData?.services} />
			<Footer />
		</main>
	)
}
