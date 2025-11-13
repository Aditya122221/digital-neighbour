import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/site-metadata"
import { getAppDevelopmentServiceBySlug } from "@/lib/sanity-service-data"
import AppDevHero from "@/components/app-development/hero"
import Certificates from "@/components/app-development/certificates"
import Industries from "@/components/commonSections/industries"
import Content from "@/components/commonSections/content"
import Services from "@/components/commonSections/services"
import Form from "@/components/commonSections/form"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import Process2 from "@/components/homepage/process2"
import Cta from "@/components/commonSections/cta"
import OtherServices from "@/components/commonSections/otherservices"
import Faq from "@/components/commonSections/faq"
import CaseStudy from "@/components/homepage/casestudy"
import IntroParagraph from "@/components/commonSections/introparagraph"
import PainPoints from "@/components/commonSections/painpoints"
import KeyBenefits from "@/components/commonSections/keybenefits"
import Features from "@/components/commonSections/features"

// Force dynamic rendering to always fetch fresh data from Sanity
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
	const appDevOverview = await getAppDevelopmentServiceBySlug("app-development")
	const appDevHeading =
		appDevOverview?.hero?.heading ?? "App Development Services"
	const appDevDescription =
		appDevOverview?.hero?.subheading ??
		"Design, build, and scale customer-ready web and mobile applications with Digital Neighbour's end-to-end product teams."

	return buildMetadata({
		title: appDevHeading,
		description: appDevDescription,
		path: "/app-development",
	})
}

export default async function AppDevelopmentPage() {
	const currentData = await getAppDevelopmentServiceBySlug("app-development")
	
	if (!currentData) {
		notFound()
	}

	return (
		<main>
			<div className="relative">
				<Navbar />
				<AppDevHero
					data={
						currentData?.hero || {
							heading: "Mobile App Development Services",
							subheading: "Design, build, and scale high-performance mobile apps for iOS, Android, and cross-platform platforms.",
						}
					}
				/>
			</div>
			<Form data={currentData?.form} />
			<BrandsMarquee />
			<IntroParagraph data={currentData?.introParagraph} />
			<PainPoints data={currentData?.painPoints} />
			<Services
				data={currentData?.services}
				serviceCards={currentData?.serviceCards}
				basePath="/app-development"
			/>
			<Content
				data={currentData?.content}
				imagePathPrefix="/seo/content"
			/>
			<Industries />
			<CaseStudy />
			<Certificates data={currentData?.certificates} />
			<Process2
				data={currentData?.services}
				processData={currentData?.process}
			/>
			<KeyBenefits data={currentData?.keyBenefits} />
			<Features data={currentData?.features} />
			<Faq data={currentData?.faq} />
			<OtherServices />
			<Cta data={currentData?.services} />
			<Footer />
		</main>
	)
}
