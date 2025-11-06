import { notFound } from "next/navigation"
import seoData from "@/data/seo.json"
import SeoHero from "@/components/seo/hero"
import Content from "@/components/commonSections/content"
import Services from "@/components/commonSections/services"
import Form from "@/components/commonSections/form"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import Process2 from "@/components/homepage/process2"
import Cta from "@/components/commonSections/cta"
import Apart from "@/components/homepage/apart"
import OtherServices from "@/components/commonSections/otherservices"
import Faq from "@/components/commonSections/faq"
import CaseStudy from "@/components/homepage/casestudy"
import Blogs from "@/components/homepage/blogs"
import Testimonials from "@/components/homepage/testimonials"
import BookACall from "@/components/homepage/bookacall"
import IntroParagraph from "@/components/commonSections/introparagraph"
import PainPoints from "@/components/commonSections/painpoints"
import KeyBenefits from "@/components/commonSections/keybenefits"
import Features from "@/components/commonSections/features"

const allowedSlugs = [
	"search-engine-optimisation",
	"local-seo",
	"wordpress-seo",
	"ecom-seo",
	"ai-seo",
	"shopify-seo",
	"seo-audits",
	"online-reputation-management",
	"seo-migration",
	"small-business-seo",
	"lead-generation",
	"link-building",
	"international-seo",
	"mobile-seo",
	"voice-search-optimisation",
	"video-seo",
	"youtube-seo",
	"seo-strategy",
	"geo",
	"sge",
	"app-store-optimisation",
	"guest-posting",
	"local-citations",
	"penalty-recovery",
	"multilingual-seo",
]

export default function SeoSlugPage({ params }: { params: { slug: string } }) {
	if (!allowedSlugs.includes(params.slug)) {
		notFound()
	}

	const currentSeoData = seoData[
		params.slug as keyof typeof seoData
	] as any

	return (
		<main>
			<div className="relative">
				<Navbar />
				<SeoHero
					data={
						currentSeoData?.hero || {
							heading: "Award-Winning SEO Marketing Agency",
							subheading: "We've helped leading and emerging brands scale their traffic and revenue organically for over a decade with our experience in seo consulting.",
						}
					}
				/>
			</div>
			<Form data={currentSeoData?.form} />
			<BrandsMarquee />
			<IntroParagraph data={currentSeoData?.introParagraph} />
			<PainPoints data={currentSeoData?.painPoints} />
			<Services
				data={currentSeoData?.services}
				serviceCards={currentSeoData?.serviceCards}
			/>
			<Content
				data={currentSeoData?.content}
				imagePathPrefix="/seo/content"
			/>
			<Cta data={currentSeoData?.services} />
			<Apart />
			<Process2
				data={currentSeoData?.services}
				processData={
					currentSeoData?.process ||
					seoData["search-engine-optimisation"]
						?.process
				}
			/>
			<KeyBenefits data={currentSeoData?.keyBenefits} />
			<Features data={currentSeoData?.features} />
			<CaseStudy />
			<Faq data={currentSeoData?.faq} />
			<OtherServices />
			<Blogs />
			<Testimonials />
			<BookACall />
			<Footer />
		</main>
	)
}
