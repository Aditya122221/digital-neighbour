import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ensureLocationForService,
  getLocationDisplayName,
  getLocationPageData,
  normalizeLocationSlug,
} from "@/lib/location-data";
import { personalizeSeoData } from "@/lib/seo-location-personalization";
import {
  buildLocationMetadataFromSeoSettings,
  buildMetadata,
  humanizeSlug,
} from "@/lib/site-metadata";
import { getWebDevelopmentServiceBySlug } from "@/lib/sanity-service-data";
import WebDevHero from "@/components/web-development/hero";
import IntroParagraph from "@/components/commonSections/introparagraph";
import PainPoints from "@/components/commonSections/painpoints";
import KeyBenefits from "@/components/commonSections/keybenefits";
import Features from "@/components/commonSections/features";
import Functionalities from "@/components/web-development/functionalities";
import Content from "@/components/commonSections/content";
import Services from "@/components/commonSections/services";
import Form from "@/components/commonSections/form";
import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import BrandsMarquee from "@/components/homepage/brandsmarquee";
import Process2 from "@/components/homepage/process2";
import Cta from "@/components/commonSections/cta";
import Industries from "@/components/web-development/industries";
import OtherServices from "@/components/commonSections/otherservices";
import Faq from "@/components/commonSections/faq";
import CaseStudy from "@/components/homepage/casestudy";

const DEFAULT_WEBDEV_SLUG = "web-development" as const;

// Force dynamic rendering to always fetch fresh data from Sanity
export const dynamic = "force-dynamic";
export const revalidate = 0;

function fromKebabToTitle(input: string) {
  return input
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function renderWebDevPage(
  data: any,
  slug: string,
  defaultHeroVideo?: string | null,
) {
  const heroFallback = {
    heading: fromKebabToTitle(slug),
    subheading:
      "We design, build, and scale fast, secure, and conversion-focused websites and web apps.",
  };

  return (
    <main>
      <div className="relative">
        <Navbar />
        <WebDevHero
          data={
            data?.hero || {
              heading: heroFallback.heading,
              subheading: heroFallback.subheading,
            }
          }
          defaultVideoSrc={defaultHeroVideo}
        />
      </div>
      <Form data={data?.form} />
      <BrandsMarquee />
      <IntroParagraph data={data?.introParagraph} />
      <PainPoints data={data?.painPoints} />
      <Functionalities />
      <Services
        data={data?.services}
        serviceCards={data?.serviceCards}
        basePath="/web-development"
      />
      <Content data={data?.content} imagePathPrefix="/seo/content" />
      <Industries />
      <CaseStudy />
      <Process2 data={data?.services} processData={data?.process} />
      <KeyBenefits data={data?.keyBenefits} />
      <Features data={data?.features} />
      <Faq data={data?.faq} />
      <OtherServices />
      <Cta data={data?.services} />
      <Footer />
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  // Get base data from Sanity
  const baseData = await getWebDevelopmentServiceBySlug(DEFAULT_WEBDEV_SLUG);
  const baseSeoSettings = baseData?.seoSettings;
  // Prioritize seoSettings.title/description if they exist and have values
  const baseSeoTitle = baseSeoSettings?.title?.trim();
  const baseSeoDescription = baseSeoSettings?.description?.trim();
  const baseHeading =
    baseSeoTitle ||
    baseData?.metadata ||
    baseData?.hero?.heading ||
    "Web Development Services";
  const baseDescription =
    baseSeoDescription ||
    baseData?.description ||
    baseData?.hero?.subheading ||
    "Design and ship high-performing websites, web apps, and digital platforms with Digital Neighbour.";

  if (slug === DEFAULT_WEBDEV_SLUG) {
    const ogImageUrl =
      baseSeoSettings?.ogImage?.asset?.url || baseSeoSettings?.ogImage?.url;
    return buildMetadata({
      title: baseHeading,
      description: baseDescription,
      path: "/web-development",
      openGraphTitle: baseSeoSettings?.ogTitle,
      openGraphDescription: baseSeoSettings?.ogDescription,
      openGraphImage: ogImageUrl,
      keywords: baseSeoSettings?.keywords,
      canonicalUrl: baseSeoSettings?.canonicalUrl,
    });
  }

  // Try to fetch from Sanity
  const currentData = await getWebDevelopmentServiceBySlug(slug);
  if (currentData) {
    // Use seoSettings from Sanity if available, otherwise fallback to other fields
    const seoSettings = currentData?.seoSettings;
    // Prioritize seoSettings.title/description if they exist and have values
    const seoTitle = seoSettings?.title?.trim();
    const seoDescription = seoSettings?.description?.trim();
    const heading =
      seoTitle ||
      currentData?.metadata ||
      currentData?.hero?.heading ||
      fromKebabToTitle(slug);
    const description =
      seoDescription ||
      currentData?.description ||
      currentData?.hero?.subheading ||
      currentData?.introParagraph?.heading ||
      `Explore ${fromKebabToTitle(
        slug,
      )} solutions created by Digital Neighbour.`;

    // Get OG image URL from seoSettings
    const ogImageUrl =
      seoSettings?.ogImage?.asset?.url || seoSettings?.ogImage?.url;

    return buildMetadata({
      title: heading,
      description,
      path: `/web-development/${slug}`,
      openGraphTitle: seoSettings?.ogTitle,
      openGraphDescription: seoSettings?.ogDescription,
      openGraphImage: ogImageUrl,
      keywords: seoSettings?.keywords,
      canonicalUrl: seoSettings?.canonicalUrl,
    });
  }

  const locationSlug = normalizeLocationSlug(slug);

  if (locationSlug) {
    const ensuredLocation = ensureLocationForService(
      "webDev",
      DEFAULT_WEBDEV_SLUG,
      locationSlug,
    );

    if (!ensuredLocation || !baseData) {
      return {
        title: "Page Not Found",
      };
    }

    const locationName =
      getLocationDisplayName(ensuredLocation) ?? humanizeSlug(ensuredLocation);

    return buildLocationMetadataFromSeoSettings({
      seoSettings: baseSeoSettings,
      fallbackTitle: baseHeading,
      fallbackDescription: baseDescription,
      path: `/web-development/${slug}`,
      locationName,
    });
  }

  return {
    title: "Page Not Found",
  };
}

export default async function WebDevSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const rootWebDevPromise = getWebDevelopmentServiceBySlug(DEFAULT_WEBDEV_SLUG);

  const resolveDefaultHeroVideo = async () => {
    const rootData = await rootWebDevPromise;
    return (
      rootData?.hero?.defaultHeroVideo?.asset?.url ||
      rootData?.hero?.defaultHeroVideo?.url ||
      null
    );
  };

  // Try to fetch from Sanity first
  const currentData = await getWebDevelopmentServiceBySlug(params.slug);
  if (currentData) {
    const defaultHeroVideo = await resolveDefaultHeroVideo();
    return renderWebDevPage(currentData, params.slug, defaultHeroVideo);
  }

  const locationSlug = normalizeLocationSlug(params.slug);

  if (locationSlug) {
    const ensuredLocation = ensureLocationForService(
      "webDev",
      DEFAULT_WEBDEV_SLUG,
      locationSlug,
    );

    if (!ensuredLocation) {
      notFound();
    }

    // Get base data from Sanity
    const baseData = await rootWebDevPromise;
    if (!baseData) {
      notFound();
    }

    const localizedBase = await getLocationPageData(
      "webDev",
      DEFAULT_WEBDEV_SLUG,
      ensuredLocation,
      baseData,
    );
    const locationName =
      getLocationDisplayName(ensuredLocation) ?? ensuredLocation;
    const personalizedData = personalizeSeoData(localizedBase, locationName);

    const defaultHeroVideo = await resolveDefaultHeroVideo();
    return renderWebDevPage(
      personalizedData,
      DEFAULT_WEBDEV_SLUG,
      defaultHeroVideo,
    );
  }

  notFound();
}
