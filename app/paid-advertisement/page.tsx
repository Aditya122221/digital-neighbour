import paidAdsData from "@/data/paid-ads.json";
import PaidAdsHero from "@/components/paid-ads/hero";
import Strategic from "@/components/paid-ads/strategic";
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

export default function PaidAdvertisementPage() {
  const currentData = paidAdsData["paid-advertisement"] as any;

  return (
    <main>
      <div className="relative">
        <Navbar />
        <PaidAdsHero data={currentData?.hero || { heading: "Performance-Driven Paid Advertising", subheading: "We scale profitable paid media across Google, Meta, LinkedIn, and YouTube." }} />
      </div>
      <Form data={currentData?.form} />
      <BrandsMarquee />
      <Services data={currentData?.services} serviceCards={currentData?.serviceCards} basePath="/paid-advertisement" />
      <Strategic data={currentData?.strategic} serviceName={currentData?.services} />
      <Content data={currentData?.content} imagePathPrefix="/seo/content" />
      <Process2 data={currentData?.services} processData={currentData?.process} />
      <Apart />
      <CaseStudy />
      <OtherServices />
      <Faq data={currentData?.faq} />
      <Cta data={currentData?.services} />
      <Footer />
    </main>
  );
}

