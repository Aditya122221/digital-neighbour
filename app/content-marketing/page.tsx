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

export default function ContentMarketingPage() {
  const currentData = contentMarketingData[
    "content-marketing"
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
        processData={currentData?.process}
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
