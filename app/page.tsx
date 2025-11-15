import type { Metadata } from "next"
import { buildMetadata } from "@/lib/site-metadata"
// import Hero from "@/components/homepage/hero"
// import Banner from "@/components/homepage/banner"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import BrandInfo from "@/components/homepage/brandInfo"
import Services from "@/components/homepage/services"
import KeepYourStack from "@/components/homepage/keepyourstack"
import CaseStudy from "@/components/homepage/casestudy"
import FeatureSection from "@/components/homepage/contentSection"
import Blogs from "@/components/homepage/blogs"
import TestimonalTwo from "@/components/homepage/testimonalTwo"
import BookACall from "@/components/homepage/bookacall"
import Footer from "@/components/core/footer"
import Navbar from "@/components/core/navbar"
// import Process from "@/components/homepage/process"
import Apart from "@/components/homepage/apart"
import Process2 from "@/components/homepage/process2"
// import RevealCursor from "@/components/homepage/revealcursor"
import Form from "@/components/commonSections/form"
import HeroSix from "@/components/homepage/herosix"
//mport Hero5 from "@/components/homepage/hero4"

const FALLBACK_TITLE = "Growth Marketing & Digital Experience Agency"
const FALLBACK_DESCRIPTION =
	"Digital Neighbour blends strategy, creativity, and technology to deliver end-to-end marketing, product, and growth programs that scale ambitious brands."

export async function generateMetadata(): Promise<Metadata> {
	return buildMetadata({
		title: FALLBACK_TITLE,
		description: FALLBACK_DESCRIPTION,
		path: "/",
	})
}

const homeData = {
	metadata: "Growth Marketing & Digital Experience Agency",
	description: "Digital Neighbour blends strategy, creativity, and technology to deliver end-to-end marketing, product, and growth programs that scale ambitious brands.",
	hero: {
		heading: "Borderless Marketing",
		subheading: "Transform your business into a digital success story with our expert marketing services.",
		images: [
			"/homepage/hero/1.jpg",
			"/homepage/hero/2.jpg",
			"/homepage/hero/3.jpg",
			"/homepage/hero/4.jpg",
		]
	},
	brandInfo: {
		main: {
			heading: "The impact marketing agency brands trust to grow.",
			subheading: "Digital Neighbour is the embedded marketing partner for ambitious teams. We unite strategy, storytelling, and performance into one streamlined crew that ships ideas fast, measures what matters, and keeps momentum on your side.",
		},
		differentiators: [
			{
				id: 1,
				title: "Full-Funnel Strategy",
				description: "Campaigns engineered around revenue targets—from awareness to retention—so every touchpoint pays off.",
				icon: "Target",
			},
			{
				id: 2,
				title: "Human + Data Approach",
				description: "Our strategists blend behavioural insights with live performance dashboards to steer decisions in real time.",
				icon: "Users2"
			},
			{
				id: 3,
				title: "Momentum Mindset",
				description: "Rapid testing sprints, weekly learnings, and constant optimisation keep your brand out in front.",
				icon: "TrendingUp",
			},
		],
		rightCard: {
			heading: "Partners, not vendors.",
			description: "We plug into your weekly cadences, share dashboards in plain language, and make the creative + data decisions you don't have time to juggle.",
			stats: [
				{
					id: "years",
					value: "12+",
					label: "Years empowering growth brands",
				},
				{
					id: "markets",
					value: "18",
					label: "Industries scaled globally"
				},
				{
					id: "roi",
					value: "4.7x",
					label: "Average paid + organic ROI"
				},
			]
		}
	},
	services: {
		heading: "Services",
		subheading: "We offer big agency services at small agency prices. Focused on three core disciplines we use our expertise to help you uncover your business needs, create traction and accelerate growth.",
		rightCard: [
			{
				video: "/homepage/services/marketing.mp4",
				title: "Marketing",
				subheading: [
					"Digital Strategy",
					"Content Creation",
					"Social Media",
				]
			},
			{
				video: "/homepage/services/website.mp4",
				title: "Development",
				subheading: [
					"Web Development",
					"Mobile Apps",
					"E-commerce",
				]
			},
			{
				video: "/homepage/services/automation.mp4",
				title: "Automation",
				subheading: [
					"Workflow Automation",
					"Process Optimisation",
					"System Integration",
				]
			},
		]
	},
	keepYourStack: {
		logos: [
			{
				name: "LinkedIn",
				svg: "/homepage/techstack/linkedin.svg"
			},
			{
				name: "Salesforce",
				svg: "/homepage/techstack/salesforce.svg"
			},
			{
				name: "HubSpot",
				svg: "/homepage/techstack/hubspot.svg"
			},
			{
				name: "Google Analytics",
				svg: "/homepage/techstack/google-analytics.svg"
			},
			{
				name: "Mailchimp",
				svg: "/homepage/techstack/mailchimp.svg"
			},
			{ name: "Asana", svg: "/homepage/techstack/asana.svg" },
			{ name: "Meta", svg: "/homepage/techstack/meta.svg" },
			{
				name: "Webflow",
				svg: "/homepage/techstack/webflow.svg"
			},
			{
				name: "ActiveCampaign",
				svg: "/homepage/techstack/active-campaign.svg"
			},
			{
				name: "WordPress",
				svg: "/homepage/techstack/wordpress.svg"
			},
			{
				name: "Google Ads",
				svg: "/homepage/techstack/goolge-ads.svg"
			},
			{ name: "Zoho", svg: "/homepage/techstack/zoho.svg" },
		]
	},
	contentSection: {
		heading: "The Impact Digital Neighbour Brings",
		subheading: "Every engagement is engineered to compound. These are the measurable shifts clients feel within the first ninety days of partnering with our team.",
		benefits: [
			{
				id: 1,
				title: "Faster Growth Sprints",
				description: "Launch campaigns in weeks, not months. Our cross-functional pods remove handoffs so you see compounding results sooner.",
				icon: "Rocket",
				stat: "3x quicker go-to-market"
			},
			{
				id: 2,
				title: "Conversion-First Experiences",
				description: "Every touchpoint is tested against revenue goals. From copy to UX, we optimise continuously to lift pipeline quality.",
				icon: "ShieldCheck",
				stat: "28% lift in qualified leads"
			},
			{
				id: 3,
				title: "Insight-Driven Decisions",
				description: "Weekly dashboards translate complex data into next steps, keeping your leadership confident about every investment.",
				icon: "Lightbulb",
				stat: "95% reporting adoption"
			},
			{
				id: 4,
				title: "Embedded Partner Support",
				description: "We work as an extension of your team with proactive stand-ups, transparent roadmaps, and on-call specialists.",
				icon: "Users",
				stat: "12+ dedicated experts"
			},
		]
	},
	process: {
		steps: [
			"Discovery & Research",
			"Strategy & Planning",
			"Design & Development",
			"Testing & Optimisation",
			"Launch & Support",
		],
		content: [
			"After analyzing your site, competition, and general market landscape we apply our knowledge and experience in SEO & PPC to build out the best growth strategy for your SaaS.<br><br>We then lay out the roadmap of a potential project together and show you how we can achieve your goals with real-world data using our proprietary AI-powered processes & technology.",
			"When our projects kick off we hit the ground running, gathering all of the data we can from you about your business from detailed questionnaires, and tools like Google Analytics & Google Search Console, as well as in strategy calls with your team.<br><br>We get familiarized with your business in an innate way and seek to understand your customers needs and pain points so that we can speak to them on their terms.",
			"We deliver a comprehensive strategy to you and your team over multiple strategy deep-dive calls that go in-depth into each area of your SaaS marketing, educating you on our recommendations and why they are important.<br><br>Then we find the best course to implement those recommendations.",
			"When you have a solid marketing strategy, there's only one thing left to do - execute.<br><br>We help your team prioritize, optimize, create, and promote content that aligns with your target ICP's pain points, concerns, and search patterns to attract customers at each stage in the buyer's journey. We either produce content for you, or guide your team through the production process, then promote it for you.",
			"One of the most important things you can do with any growth project is to keep a close eye on the performance, and use data to adapt over time.<br><br>We provide deep monthly reports with the metrics that matter most to your SaaS growth and analyze them for future opportunities. We continually iterate on our actions, adjusting course when needed to achieve your goals as efficiently as possible.",
		]
	}
}
export default function HomePage() {
	return (
		<main>
			<div className="relative">
				<Navbar />
				<HeroSix data={homeData.hero} />
				{/* <Hero5 /> */}
			</div>
			{/* <Banner /> */}
			<BrandsMarquee />
			<BrandInfo data={homeData.brandInfo} />
			{/* <RevealCursor /> */}
			<Services data={homeData.services} />
			<KeepYourStack data={homeData.keepYourStack} />
			<CaseStudy />
			<FeatureSection data={homeData.contentSection} />
			<Apart />
			<TestimonalTwo />
			<Process2 processData={homeData.process} />
			<Blogs />
			<BookACall />
			<Footer />
		</main>
	)
}
