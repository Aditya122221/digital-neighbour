import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  ensureLocationForService,
  getLocationDisplayName,
  getLocationPageData,
  normalizeLocationSlug,
  isValidLocationSlug,
} from "@/lib/location-data";
import { personalizeSeoData } from "@/lib/seo-location-personalization";
import { buildMetadata, humanizeSlug } from "@/lib/site-metadata";
import { getPaidAdsServiceBySlug } from "@/lib/sanity-service-data";
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
import Features from "@/components/commonSections/features";
import IntroParagraph from "@/components/commonSections/introparagraph";
import PainPoints from "@/components/commonSections/painpoints";
import KeyBenefits from "@/components/commonSections/keybenefits";

const allowedSlugs = [
  "paid-advertisement",
  "google-ads",
  "google-remarketing",
  "google-shopping-ads",
  "paid-social",
  "youtube-ads",
  "meta-ads",
  "linkedin-ads",
  "google-display-ads",
  "pay-per-click",
  "bing-ads",
  "facebook-ads",
  "instagram-ads",
  "linkedin-ads-management",
  "tiktok-ads",
  "snapchat-ads",
  "twitter-x-ads",
  "pinterest-ads",
];

const DEFAULT_PAID_SLUG = "google-ads" as const;

// Force dynamic rendering to always fetch fresh data from Sanity
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Get base data from Sanity
  const baseData = await getPaidAdsServiceBySlug("paid-advertisement");
  const baseHeading =
    baseData?.metadata ??
    baseData?.hero?.heading ??
    "Paid Advertising Services";
  const baseDescription =
    baseData?.description ??
    baseData?.hero?.subheading ??
    "Plan, launch, and optimise high-performing paid media across Google, Meta, LinkedIn, and YouTube with Digital Neighbour.";

  if (slug === "paid-advertisement") {
    return buildMetadata({
      title: baseHeading,
      description: baseDescription,
      path: "/paid-advertisement",
    });
  }

  const locationSlug = normalizeLocationSlug(slug);

  if (!allowedSlugs.includes(slug)) {
    if (locationSlug) {
      // First try to ensure location is enabled for the service
      let ensuredLocation = ensureLocationForService(
        "paidAds",
        DEFAULT_PAID_SLUG,
        locationSlug,
      );

      // If not enabled for service, but it's a valid location slug, use it anyway
      if (!ensuredLocation && isValidLocationSlug(locationSlug)) {
        ensuredLocation = locationSlug;
      }

      if (!ensuredLocation) {
        return {
          title: "Page Not Found",
        };
      }

      // Get base data from Sanity
      const basePaidData = await getPaidAdsServiceBySlug(DEFAULT_PAID_SLUG);
      if (!basePaidData) {
        return {
          title: "Page Not Found",
        };
      }

      const localizedBase = await getLocationPageData(
        "paidAds",
        DEFAULT_PAID_SLUG,
        ensuredLocation,
        basePaidData,
      );
      const locationName =
        getLocationDisplayName(ensuredLocation) ??
        humanizeSlug(ensuredLocation);
      const personalizedData = personalizeSeoData(localizedBase, locationName);

      const heading =
        personalizedData?.hero?.heading ??
        `Paid Advertising in ${locationName}`;
      const description =
        personalizedData?.hero?.subheading ??
        `Run profitable paid media campaigns in ${locationName} with Digital Neighbour.`;

      return buildMetadata({
        title: heading,
        description,
        path: `/paid-advertisement/${slug}`,
      });
    }

    return {
      title: "Page Not Found",
    };
  }

  // Fetch from Sanity
  const currentData = await getPaidAdsServiceBySlug(slug);
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
    `Discover ${humanizeSlug(slug)} programmes crafted by Digital Neighbour.`;

  return buildMetadata({
    title: heading,
    description,
    path: `/paid-advertisement/${slug}`,
  });
}

export default async function PaidAdsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: requestedSlug } = await params;
  if (requestedSlug === "paid-advertisement") {
    redirect("/paid-advertisement");
  }

  const rootPaidAdsPromise = getPaidAdsServiceBySlug("paid-advertisement");
  const resolveDefaultHeroVideo = async () => {
    const rootData = await rootPaidAdsPromise;
    return (
      rootData?.hero?.defaultHeroVideo?.asset?.url ||
      rootData?.hero?.defaultHeroVideo?.url ||
      null
    );
  };

  const locationSlug = normalizeLocationSlug(requestedSlug);

  if (!allowedSlugs.includes(requestedSlug)) {
    if (locationSlug) {
      // First try to ensure location is enabled for the service
      let ensuredLocation = ensureLocationForService(
        "paidAds",
        DEFAULT_PAID_SLUG,
        locationSlug,
      );

      // If not enabled for service, but it's a valid location slug, use it anyway
      if (!ensuredLocation && isValidLocationSlug(locationSlug)) {
        ensuredLocation = locationSlug;
      }

      if (!ensuredLocation) {
        notFound();
      }

      // Get base data from Sanity
      const baseData = await getPaidAdsServiceBySlug(DEFAULT_PAID_SLUG);
      if (!baseData) {
        notFound();
      }

      const localizedBase = await getLocationPageData(
        "paidAds",
        DEFAULT_PAID_SLUG,
        ensuredLocation,
        baseData,
      );
      const locationName =
        getLocationDisplayName(ensuredLocation) ?? ensuredLocation;
      const personalizedData = personalizeSeoData(localizedBase, locationName);

      const defaultHeroVideo = await resolveDefaultHeroVideo();
      return renderPaidAdsPage(personalizedData, defaultHeroVideo);
    }

    notFound();
  }

  // Fetch from Sanity
  const currentData = await getPaidAdsServiceBySlug(requestedSlug);
  if (!currentData) {
    notFound();
  }

  const defaultHeroVideo = await resolveDefaultHeroVideo();
  return renderPaidAdsPage(currentData, defaultHeroVideo);
}

function renderPaidAdsPage(currentData: any, defaultHeroVideo?: string | null) {
  return (
    <main>
      <div className="relative">
        <Navbar />
        <PaidAdsHero
          data={
            currentData?.hero || {
              heading: "Performance-Driven Paid Advertising",
              subheading:
                "We scale profitable paid media across Google, Meta, LinkedIn, and YouTube.",
            }
          }
          defaultVideoSrc={defaultHeroVideo}
        />
      </div>
      <Form data={currentData?.form} />
      <BrandsMarquee />
      <IntroParagraph data={currentData?.introParagraph} />
      <PainPoints data={currentData?.painPoints} />
      <Services
        data={currentData?.services}
        serviceCards={currentData?.serviceCards}
        basePath="/paid-advertisement"
      />
      <Strategic
        data={currentData?.strategic}
        serviceName={currentData?.services}
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
