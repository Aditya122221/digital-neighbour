import appDevData from "@/data/app-development.json"
import AppDevHero from "@/components/app-development/hero"
import Certificates from "@/components/app-development/certificates"
import Industries from "@/components/app-development/industries"
import SeoContent from "@/components/seo/content"
import SeoServices from "@/components/seo/services"
import SeoForm from "@/components/seo/form"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import Process2 from "@/components/homepage/process2"
import SeoCta from "@/components/seo/cta"
import OtherServices from "@/components/seo/otherservices"
import SeoFaq from "@/components/seo/faq"
import CaseStudy from "@/components/homepage/casestudy"
import IntroParagraph from "@/components/app-development/introparagraph"
import PainPoints from "@/components/app-development/painpoints"
import KeyBenefits from "@/components/app-development/keybenefits"

export default function AppDevelopmentPage() {
	const currentData = appDevData["app-development"] as any

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
			<SeoForm data={currentData?.form} />
			<BrandsMarquee />
			<IntroParagraph data={currentData?.introParagraph} />
			<PainPoints data={currentData?.painPoints} />
			<SeoServices
				data={currentData?.services}
				serviceCards={currentData?.serviceCards}
				basePath="/app-development"
			/>
			<SeoContent data={currentData?.content} />
			{currentData?.industries && (
				<Industries data={currentData?.industries} />
			)}
			<CaseStudy />
			<Certificates data={currentData?.certificates} />
			<OtherServices />
			<Process2
				data={currentData?.services}
				processData={currentData?.process}
			/>
			<KeyBenefits data={currentData?.keyBenefits} />
			<SeoFaq data={currentData?.faq} />
			<SeoCta data={currentData?.services} />
			<Footer />
		</main>
	)
}

