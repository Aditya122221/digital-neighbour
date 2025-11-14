import { notFound, redirect } from "next/navigation";
import {
  ensureLocationForService,
  getLocationDisplayName,
  getLocationPageData,
  normalizeLocationSlug,
} from "@/lib/location-data";
import { personalizeSeoData } from "@/lib/seo-location-personalization";
import { buildMetadata, humanizeSlug } from "@/lib/site-metadata";
import { getHostingServiceBySlug } from "@/lib/sanity-service-data";
import HostingHero from "@/components/hosting-it-security/hero";
import Content from "@/components/commonSections/content";
import Services from "@/components/commonSections/services";
import Form from "@/components/commonSections/form";
import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import BrandsMarquee from "@/components/homepage/brandsmarquee";
import HostingProcess from "@/components/hosting-it-security/hostingProcess";
import Process2 from "@/components/homepage/process2";
import Cta from "@/components/commonSections/cta";
import OtherServices from "@/components/commonSections/otherservices";
import Faq from "@/components/commonSections/faq";
import CaseStudy from "@/components/homepage/casestudy";
import IntroParagraph from "@/components/commonSections/introparagraph";
import PainPoints from "@/components/commonSections/painpoints";
import KeyBenefits from "@/components/commonSections/keybenefits";
import Apart from "@/components/homepage/apart";
import HostingServices from "@/components/hosting-it-security/services";
import Features from "@/components/commonSections/features";

const allowedSlugs = [
  "hosting-it-security",
  "web-hosting",
  "wordpress-hosting",
  "email-hosting",
  "reseller-hosting",
  "ecommerce-hosting",
  "dedicated-servers",
  "windows-virtual-servers",
  "linux-servers",
  "vps",
  "shared-hosting-services",
  "cloud-hosting-and-management",
  "dedicated-hosting-services",
  "aws-hosting-solutions",
  "data-migration",
  "website-security",
  "ssl-certificate-setup",
  "web-application-firewall-setup",
  "malware-removal-services",
  "web-maintenance",
];

const DEFAULT_HOSTING_SLUG = "web-hosting" as const;

// Force dynamic rendering to always fetch fresh data from Sanity
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  // Get base data from Sanity
  const baseData = await getHostingServiceBySlug("hosting-it-security");
  const baseHeading =
    baseData?.metadata ??
    baseData?.hero?.heading ??
    "Hosting, IT & Security Services";
  const baseDescription =
    baseData?.description ??
    baseData?.hero?.subheading ??
    "Protect, optimise, and manage your digital infrastructure with secure hosting, managed IT, and cyber security services from Digital Neighbour.";

  if (slug === "hosting-it-security") {
    return buildMetadata({
      title: baseHeading,
      description: baseDescription,
      path: "/hosting-it-security",
    });
  }

  const locationSlug = normalizeLocationSlug(slug);

  if (!allowedSlugs.includes(slug)) {
    if (locationSlug) {
      const ensuredLocation = ensureLocationForService(
        "hosting",
        DEFAULT_HOSTING_SLUG,
        locationSlug,
      );
      if (!ensuredLocation) {
        return {
          title: "Page Not Found",
        };
      }

      const baseHostingData = await getHostingServiceBySlug(DEFAULT_HOSTING_SLUG);
      if (!baseHostingData) {
        return {
          title: "Page Not Found",
        };
      }

      const localizedBase = await getLocationPageData(
        "hosting",
        DEFAULT_HOSTING_SLUG,
        ensuredLocation,
        baseHostingData,
      );
      const locationName =
        getLocationDisplayName(ensuredLocation) ??
        humanizeSlug(ensuredLocation);
      const personalizedData = personalizeSeoData(
        localizedBase,
        locationName,
      );

      const heading =
        personalizedData?.hero?.heading ??
        `Hosting & IT Security in ${locationName}`;
      const description =
        personalizedData?.hero?.subheading ??
        `Secure hosting and IT solutions in ${locationName} with Digital Neighbour.`;

      return buildMetadata({
        title: heading,
        description,
        path: `/hosting-it-security/${slug}`,
      });
    }

    return {
      title: "Page Not Found",
    };
  }

  // Fetch from Sanity
  const currentData = await getHostingServiceBySlug(slug);
  if (!currentData) {
    return {
      title: "Page Not Found",
    };
  }

  const heading =
    currentData?.metadata ??
    currentData?.hero?.heading ??
    `${humanizeSlug(slug)} Services`;
  const description =
    currentData?.description ??
    currentData?.hero?.subheading ??
    currentData?.introParagraph?.heading ??
    `Discover ${humanizeSlug(slug)} solutions from Digital Neighbour.`;

  return buildMetadata({
    title: heading,
    description,
    path: `/hosting-it-security/${slug}`,
  });
}

export default async function HostingItSecuritySlugPage({
  params,
}: {
  params: { slug: string };
}) {
  if (params.slug === "hosting-it-security") {
    redirect("/hosting-it-security");
  }

  const locationSlug = normalizeLocationSlug(params.slug);

  if (!allowedSlugs.includes(params.slug)) {
    if (locationSlug) {
      const ensuredLocation = ensureLocationForService(
        "hosting",
        DEFAULT_HOSTING_SLUG,
        locationSlug,
      );
      if (!ensuredLocation) {
        notFound();
      }

      // Get base data from Sanity
      const baseData = await getHostingServiceBySlug(DEFAULT_HOSTING_SLUG);
      if (!baseData) {
        notFound();
      }

      const localizedBase = await getLocationPageData(
        "hosting",
        DEFAULT_HOSTING_SLUG,
        ensuredLocation,
        baseData,
      );
      const locationName =
        getLocationDisplayName(ensuredLocation) ?? ensuredLocation;
      const personalizedData = personalizeSeoData(localizedBase, locationName);

      return renderHostingPage(personalizedData);
    }
    notFound();
  }

  // Fetch from Sanity
  const currentData = await getHostingServiceBySlug(params.slug);
  if (!currentData) {
    notFound();
  }

  return renderHostingPage(currentData);
}

function renderHostingPage(currentData: any) {
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
