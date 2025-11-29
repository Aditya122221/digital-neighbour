import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  ensureLocationForService,
  getLocationDisplayName,
  getLocationPageData,
  normalizeLocationSlug,
} from "@/lib/location-data";
import { personalizeSeoData } from "@/lib/seo-location-personalization";
import { buildMetadata, humanizeSlug } from "@/lib/site-metadata";
import { getAppDevelopmentServiceBySlug } from "@/lib/sanity-service-data";
import AppDevHero from "@/components/app-development/hero";
import Certificates from "@/components/app-development/certificates";
import Industries from "@/components/commonSections/industries";
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
import Blogs from "@/components/homepage/blogs";
import Testimonials from "@/components/homepage/testimonials";
import BookACall from "@/components/homepage/bookacall";
import IntroParagraph from "@/components/commonSections/introparagraph";
import PainPoints from "@/components/commonSections/painpoints";
import KeyBenefits from "@/components/commonSections/keybenefits";
import Features from "@/components/commonSections/features";

const allowedSlugs = [
  "app-development",
  "ios-app-development",
  "android-app-development",
  "react-native-development",
  "flutter-app-development",
  "software-development",
  "progressive-web-apps",
];

const DEFAULT_APP_SLUG = "app-development" as const;

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
  const baseData = await getAppDevelopmentServiceBySlug(DEFAULT_APP_SLUG);
  const baseHeading =
    baseData?.metadata ?? baseData?.hero?.heading ?? "App Development Services";
  const baseDescription =
    baseData?.description ??
    baseData?.hero?.subheading ??
    "Design, build, and scale high-performance digital products with Digital Neighbour.";

  if (slug === DEFAULT_APP_SLUG) {
    return buildMetadata({
      title: baseHeading,
      description: baseDescription,
      path: "/app-development",
    });
  }

  const locationSlug = normalizeLocationSlug(slug);

  if (!allowedSlugs.includes(slug)) {
    if (locationSlug) {
      const ensuredLocation = ensureLocationForService(
        "app",
        DEFAULT_APP_SLUG,
        locationSlug,
      );
      if (!ensuredLocation) {
        return {
          title: "Page Not Found",
        };
      }

      if (!baseData) {
        return {
          title: "Page Not Found",
        };
      }

      const localizedBase = await getLocationPageData(
        "app",
        DEFAULT_APP_SLUG,
        ensuredLocation,
        baseData,
      );
      const locationName =
        getLocationDisplayName(ensuredLocation) ??
        humanizeSlug(ensuredLocation);
      const personalizedData = personalizeSeoData(localizedBase, locationName);

      const heading =
        personalizedData?.hero?.heading ?? `App Development in ${locationName}`;
      const description =
        personalizedData?.hero?.subheading ??
        `Build and scale digital products in ${locationName} with Digital Neighbour.`;

      return buildMetadata({
        title: heading,
        description,
        path: `/app-development/${slug}`,
      });
    }

    return {
      title: "Page Not Found",
    };
  }

  // Fetch from Sanity
  const currentData = await getAppDevelopmentServiceBySlug(slug);
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
    `Explore ${humanizeSlug(slug)} solutions from Digital Neighbour.`;

  return buildMetadata({
    title: heading,
    description,
    path: `/app-development/${slug}`,
  });
}

export default async function AppDevSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  // Redirect "app-development" to the main app development page
  if (params.slug === "app-development") {
    redirect("/app-development");
  }

  const rootAppPromise = getAppDevelopmentServiceBySlug(DEFAULT_APP_SLUG);

  const resolveDefaultHeroImages = async () => {
    const rootData = await rootAppPromise;
    return rootData?.hero?.defaultHeroImages || null;
  };

  const locationSlug = normalizeLocationSlug(params.slug);

  if (!allowedSlugs.includes(params.slug)) {
    if (locationSlug) {
      const ensuredLocation = ensureLocationForService(
        "app",
        DEFAULT_APP_SLUG,
        locationSlug,
      );
      if (!ensuredLocation) {
        notFound();
      }

      // Get base data from Sanity
      const baseData = await rootAppPromise;
      if (!baseData) {
        notFound();
      }

      const localizedBase = await getLocationPageData(
        "app",
        DEFAULT_APP_SLUG,
        ensuredLocation,
        baseData,
      );
      const locationName =
        getLocationDisplayName(ensuredLocation) ?? ensuredLocation;
      const personalizedData = personalizeSeoData(localizedBase, locationName);

      const defaultHeroImages = await resolveDefaultHeroImages();
      return renderAppPage(personalizedData, defaultHeroImages);
    }

    notFound();
  }

  // Fetch from Sanity
  const currentData = await getAppDevelopmentServiceBySlug(params.slug);
  if (!currentData) {
    notFound();
  }

  const defaultHeroImages = await resolveDefaultHeroImages();
  return renderAppPage(currentData, defaultHeroImages);
}

function renderAppPage(currentData: any, defaultHeroImages?: any[] | null) {
  return (
    <main>
      <div className="relative">
        <Navbar />
        <AppDevHero
          data={
            currentData?.hero || {
              heading: "Mobile App Development Services",
              subheading:
                "Design, build, and scale high-performance mobile apps for iOS, Android, and cross-platform platforms.",
            }
          }
          defaultImages={defaultHeroImages}
        />
      </div>
      <Form data={currentData?.form} />
      <BrandsMarquee />
      <IntroParagraph data={currentData?.introParagraph} />
      <PainPoints data={currentData?.painPoints} />
      <Services
        data={currentData?.services}
        serviceCards={currentData?.serviceCards}
        basePath="/app-development"
      />
      <Content data={currentData?.content} imagePathPrefix="/seo/content" />
      <Industries />
      <CaseStudy />
      <Certificates data={currentData?.certificates} />
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
