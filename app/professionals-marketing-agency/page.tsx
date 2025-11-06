import professionalsData from "@/data/professionals-marketing.json"
import IndustriesHero from "@/components/industries/hero"
import Content from "@/components/commonSections/content"
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
import Features from "@/components/ai-automation/features"
import Apart from "@/components/homepage/apart"
import CreativeShowcase from "@/components/industries/creative-showcase"
import HostingServices from "@/components/hosting-it-security/services"

export default function ProfessionalsMarketingPage() {
	const currentData = (professionalsData as any)["professionals"]
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
	const compatibleProcess = currentData?.process
		? {
				steps: Array.isArray(currentData.process.steps)
					? currentData.process.steps.map(
							(s: any) =>
								typeof s ===
								"string"
									? s
									: s.title
					  )
					: [],
				content: Array.isArray(
					currentData.process.content
				)
					? currentData.process.content
					: Array.isArray(
							currentData.process
								.steps
					  )
					? currentData.process.steps.map(
							(s: any) =>
								typeof s ===
								"string"
									? ""
									: s.description ||
									  ""
					  )
					: [],
		  }
		: undefined

	return (
		<main>
			<div className="relative">
				<Navbar />
				<IndustriesHero data={currentData?.hero} />
			</div>
			<Form data={currentData?.form} />
			<BrandsMarquee />
			<IntroParagraph data={introData} />
			<PainPoints data={painData} />
			<HostingServices
				data={currentData?.services}
				serviceCards={currentData?.serviceCards}
				basePath="/hosting-it-security"
				premiumCloudServices={
					currentData?.premiumCloudServices
				}
			/>
			<Content data={currentData?.content} imagePathPrefix="/seo/content" />
			<Apart />
			<CaseStudy />
			<OtherServices />
			<Process2
				data={"Professional Marketing"}
				processData={compatibleProcess}
			/>
			<KeyBenefits data={benefitsData} />
			<Features data={currentData?.features} />
			<Faq
				data={
					(professionalsData as any).professionals
						?.faq
				}
			/>
			<Cta data={currentData?.services} />
			<Footer />
		</main>
	)
}
