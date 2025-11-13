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
import { buildMetadata, humanizeSlug } from "@/lib/site-metadata";
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


function renderWebDevPage(data: any, slug: string) {
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
  const baseHeading =
    baseData?.hero?.heading ?? "Web Development Services";
  const baseDescription =
    baseData?.hero?.subheading ??
    "Design and ship high-performing websites, web apps, and digital platforms with Digital Neighbour.";

  if (slug === DEFAULT_WEBDEV_SLUG) {
    return buildMetadata({
      title: baseHeading,
      description: baseDescription,
      path: "/web-development",
    });
  }

  // Try to fetch from Sanity
  const currentData = await getWebDevelopmentServiceBySlug(slug);
  if (currentData) {
    const heading =
      currentData?.hero?.heading ?? fromKebabToTitle(slug);
    const description =
      currentData?.hero?.subheading ??
      currentData?.introParagraph?.heading ??
      `Explore ${fromKebabToTitle(
        slug
      )} solutions created by Digital Neighbour.`;

    return buildMetadata({
      title: heading,
      description,
      path: `/web-development/${slug}`,
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

    const localizedBase = await getLocationPageData(
      "webDev",
      DEFAULT_WEBDEV_SLUG,
      ensuredLocation,
      baseData,
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
      `Web Development in ${locationName}`;
    const description =
      personalizedData?.hero?.subheading ??
      `Build and launch digital experiences in ${locationName} with Digital Neighbour.`;

    return buildMetadata({
      title: heading,
      description,
      path: `/web-development/${slug}`,
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
  // Try to fetch from Sanity first
  const currentData = await getWebDevelopmentServiceBySlug(params.slug);
  if (currentData) {
    return renderWebDevPage(currentData, params.slug);
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
    const baseData = await getWebDevelopmentServiceBySlug(DEFAULT_WEBDEV_SLUG);
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

    return renderWebDevPage(personalizedData, DEFAULT_WEBDEV_SLUG);
  }

  notFound();
}
