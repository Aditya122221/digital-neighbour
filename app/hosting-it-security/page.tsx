import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadataFromSeoSettings } from "@/lib/site-metadata";
import { getHostingServiceBySlug } from "@/lib/sanity-service-data";
import HostingHero from "@/components/hosting-it-security/hero";
import Content from "@/components/commonSections/content";
import HostingServices from "@/components/hosting-it-security/services";
import Form from "@/components/commonSections/form";
import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import BrandsMarquee from "@/components/homepage/brandsmarquee";
import Process2 from "@/components/homepage/process2";
import Cta from "@/components/commonSections/cta";
import OtherServices from "@/components/commonSections/otherservices";
import Faq from "@/components/commonSections/faq";
import CaseStudy from "@/components/homepage/casestudy";
import IntroParagraph from "@/components/commonSections/introparagraph";
import PainPoints from "@/components/commonSections/painpoints";
import KeyBenefits from "@/components/commonSections/keybenefits";
import Features from "@/components/commonSections/features";
import Apart from "@/components/homepage/apart";
import HostingProcess from "@/components/hosting-it-security/hostingProcess";

// Force dynamic rendering to always fetch fresh data from Sanity
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const hostingOverview = await getHostingServiceBySlug("hosting-it-security");
  const hostingHeading =
    hostingOverview?.hero?.heading?.trim() ||
    "Hosting, IT & Security Services";
  const hostingDescription =
    hostingOverview?.hero?.subheading?.trim() ||
    "Protect, optimise, and manage your digital infrastructure with secure hosting, managed IT, and cyber security services from Digital Neighbour.";

  return buildMetadataFromSeoSettings({
    seoSettings: hostingOverview?.seoSettings,
    fallbackTitle: hostingHeading,
    fallbackDescription: hostingDescription,
    path: "/hosting-it-security",
  });
}

export default async function HostingItSecurityPage() {
  const currentData = await getHostingServiceBySlug("hosting-it-security");

  if (!currentData) {
    notFound();
  }

  const defaultHeroVideo =
    currentData?.hero?.defaultHeroVideo?.asset?.url ||
    currentData?.hero?.defaultHeroVideo?.url ||
    null;

  return (
    <main>
      <div className="relative">
        <Navbar />
        <HostingHero
          data={
            currentData?.hero || {
              heading: "Hosting, IT & Security Services",
              subheading:
                "Reliable hosting solutions and comprehensive IT security services to keep your business online, secure, and running smoothly.",
            }
          }
          defaultVideoSrc={defaultHeroVideo}
        />
      </div>
      <Form data={currentData?.form} />
      <BrandsMarquee />
      <IntroParagraph data={currentData?.introParagraph} />
      <PainPoints data={currentData?.painPoints} />
      <HostingServices
        data={currentData?.services}
        serviceCards={currentData?.serviceCards}
        basePath="/hosting-it-security"
        premiumCloudServices={currentData?.premiumCloudServices}
      />
      <Content data={currentData?.content} imagePathPrefix="/seo/content" />
      <Apart />
      <CaseStudy />
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
  );
}
