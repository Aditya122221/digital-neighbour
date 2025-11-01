import hostingData from "@/data/hosting-it-security.json"
import HostingHero from "@/components/hosting-it-security/hero"
import SeoContent from "@/components/seo/content"
import HostingServices from "@/components/hosting-it-security/services"
import SeoForm from "@/components/seo/form"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import Process2 from "@/components/homepage/process2"
import SeoCta from "@/components/seo/cta"
import OtherServices from "@/components/seo/otherservices"
import SeoFaq from "@/components/seo/faq"
import CaseStudy from "@/components/homepage/casestudy"
import IntroParagraph from "@/components/hosting-it-security/introparagraph"
import PainPoints from "@/components/hosting-it-security/painpoints"
import KeyBenefits from "@/components/hosting-it-security/keybenefits"
import Features from "@/components/hosting-it-security/features"
import Apart from "@/components/homepage/apart"

export default function HostingItSecurityPage() {
	const currentData = hostingData["hosting-it-security"] as any

	return (
		<main>
			<div className="relative">
				<Navbar />
				<HostingHero
					data={
						currentData?.hero || {
							heading: "Hosting, IT & Security Services",
							subheading: "Reliable hosting solutions and comprehensive IT security services to keep your business online, secure, and running smoothly.",
						}
					}
				/>
			</div>
			<SeoForm data={currentData?.form} />
			<BrandsMarquee />
			<IntroParagraph data={currentData?.introParagraph} />
			<PainPoints data={currentData?.painPoints} />
			<HostingServices
				data={currentData?.services}
				serviceCards={currentData?.serviceCards}
				basePath="/hosting-it-security"
				premiumCloudServices={
					currentData?.premiumCloudServices
				}
			/>
			<SeoContent data={currentData?.content} />
			<Apart />
			<CaseStudy />
			<OtherServices />
			<Process2
				data={currentData?.services}
				processData={currentData?.process}
			/>
			<KeyBenefits data={currentData?.keyBenefits} />
			<Features data={currentData?.features} />
			<SeoFaq data={currentData?.faq} />
			<SeoCta data={currentData?.services} />
			<Footer />
		</main>
	)
}
