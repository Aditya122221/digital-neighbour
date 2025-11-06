import React from "react"
import { notFound } from "next/navigation"
import webDevData from "@/data/web-development.json"
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

type WebDevJson = Record<string, any> & {
	otherServices?: { webdevelopmentServices?: string[] }
}

const data = webDevData as unknown as WebDevJson

function toKebabCase(input: string) {
	return input
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)+/g, "")
}

function fromKebabToTitle(input: string) {
	return input
		.split("-")
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(" ")
}

function getAllowedSlugs() {
	const jsonSlugs = Object.keys(data).filter((k) => k !== "otherServices")
	const otherServiceSlugs = (
		data.otherServices?.webdevelopmentServices || []
	).map((s) => toKebabCase(s))
	return new Set([...jsonSlugs, ...otherServiceSlugs])
}

function resolveDataForSlug(slug: string) {
	const base = (data as any)["web-development"] || {}
	const direct = (data as any)[slug]
	if (direct) return direct

	const otherList = data.otherServices?.webdevelopmentServices || []
	const match = otherList.find((label) => toKebabCase(label) === slug)
	if (!match) return null

	// Virtualize content for other services using the base as fallback
	return {
		...base,
		hero: {
			...(base?.hero || {}),
			heading: match,
			subheading: `Professional ${match} services tailored to your business needs.`,
		},
		services: match,
		form: base?.form || {},
		content: base?.content || {},
		serviceCards: base?.serviceCards || [],
		process: base?.process || {},
		introParagraph: base?.introParagraph || {},
		painPoints: base?.painPoints || {},
		keyBenefits: base?.keyBenefits || {},
		features: base?.features || {},
		faq: {
			...(base?.faq || {}),
			serviceName: match,
		},
	}
}

export async function generateStaticParams() {
	return Array.from(getAllowedSlugs()).map((slug) => ({ slug }))
}

export default function WebDevSlugPage({
	params,
}: {
	params: { slug: string }
}) {
	const allowed = getAllowedSlugs()
	if (!allowed.has(params.slug)) {
		notFound()
	}

	const currentData = resolveDataForSlug(params.slug)
	const heroFallback = {
		heading: fromKebabToTitle(params.slug),
		subheading: "We design, build, and scale fast, secure, and conversion-focused websites and web apps.",
	}

	const introData = currentData?.introParagraph
		? {
				heading: currentData.introParagraph.heading,
				problemStatement:
					currentData.introParagraph
						?.paragraphs?.[0],
				valueProposition:
					currentData.introParagraph
						?.paragraphs?.[1],
		  }
		: undefined
	const painData = currentData?.painPoints
		? {
				heading: currentData.painPoints.heading,
				subheading: currentData.painPoints.subheading,
				painPoints: (
					currentData.painPoints.items || []
				).map((p: any) => ({
					problem: p.title,
					solution: p.description,
				})),
		  }
		: undefined
	const benefitsData = currentData?.keyBenefits
		? {
				heading: currentData.keyBenefits.heading,
				subheading: currentData.keyBenefits.subheading,
				benefits: (
					currentData.keyBenefits.items || []
				).map((b: any) => ({
					title: b.title,
					description: b.description,
					icon: b.icon,
					image: b.image,
				})),
		  }
		: undefined

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
<IntroParagraph data = { introData } />
<PainPoints data={painData} />
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
			<KeyBenefits data={benefitsData} />
< Features data = { currentData?.features } />
<Faq data={currentData?.faq} />
	<OtherServices />
	<Cta data={currentData?.services} />
	<Footer />
		</main>
	)
}
