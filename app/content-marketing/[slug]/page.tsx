import { notFound } from "next/navigation";
import contentMarketingData from "@/data/content-marketing.json";
import ContentMarketingHero from "@/components/content-marketing/hero";
import Content from "@/components/commonSections/content";
import Services from "@/components/commonSections/services";
import Form from "@/components/commonSections/form";
import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import BrandsMarquee from "@/components/homepage/brandsmarquee";
import Process2 from "@/components/homepage/process2";
import Cta from "@/components/commonSections/cta";
import Apart from "@/components/homepage/apart";
import OtherServices from "@/components/commonSections/otherservices";
import Faq from "@/components/commonSections/faq";
import CaseStudy from "@/components/homepage/casestudy";

const allowedSlugs = [
  "content-marketing",
  "content-strategy",
  "video-content",
  "infographics",
  "whitepapers",
  "case-studies",
  "ebooks",
  "podcast-content",
  "copywriting",
  "graphic-designing",
  "video-editing",
  "photo-shoot",
  "video-shoot",
  "infographic-design",
  "website-copywriting",
  "sales-copywriting",
  "press-release-writing",
  "ad-copywriting",
  "logo-design",
  "email-marketing",
  "pr-outreach",
  "branding",
];

export default function ContentMarketingSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!allowedSlugs.includes(params.slug)) {
    notFound();
  }

  const currentData =
    contentMarketingData[
      params.slug as keyof typeof contentMarketingData
    ] as any;

  return (
    <main>
      <div className="relative">
        <Navbar />
        <ContentMarketingHero
          data={
            currentData?.hero || {
              heading: "Strategic Content Marketing",
              subheading:
                "We create compelling content that drives engagement, builds authority, and converts visitors into customers.",
            }
          }
        />
      </div>
      <Form data={currentData?.form} />
      <BrandsMarquee />
      <Services
        data={currentData?.services}
        serviceCards={currentData?.serviceCards}
        basePath="/content-marketing"
      />
      <Process2
        data={currentData?.services}
        processData={
          currentData?.process ||
          contentMarketingData["content-marketing"]?.process
        }
      />
      <Content data={currentData?.content} imagePathPrefix="/seo/content" />
      <Apart />
      <CaseStudy />
      <OtherServices />
      <Faq data={currentData?.faq} />
      <Cta data={currentData?.services} />
      <Footer />
    </main>
  );
}
