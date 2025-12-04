import type { Metadata } from "next";
import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import AboutHero from "@/components/about/hero";
import Origins from "@/components/about/origins";
import Values from "@/components/about/values";
import Achievements from "@/components/about/achievements";
import Team from "@/components/about/team";
import {
  getAboutPageData,
  ABOUT_PAGE_FALLBACK_DESCRIPTION,
  ABOUT_PAGE_FALLBACK_TITLE,
} from "@/lib/about-data";
import { buildMetadata } from "@/lib/site-metadata";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const aboutPageData = await getAboutPageData();
  const seoTitle = aboutPageData.seo?.title?.trim();
  const seoDescription = aboutPageData.seo?.description?.trim();

  return buildMetadata({
    title: seoTitle || ABOUT_PAGE_FALLBACK_TITLE,
    description: seoDescription || ABOUT_PAGE_FALLBACK_DESCRIPTION,
    path: "/about",
    openGraphTitle: aboutPageData.seo?.ogTitle,
    openGraphDescription: aboutPageData.seo?.ogDescription,
    openGraphImage: aboutPageData.seo?.ogImage,
    keywords: aboutPageData.seo?.keywords,
    canonicalUrl: aboutPageData.seo?.canonicalUrl,
  });
}

export default async function AboutPage() {
  const aboutPageData = await getAboutPageData();

  return (
    <main>
      <div className="relative">
        <Navbar />
        <AboutHero content={aboutPageData.hero} />
      </div>
      <Origins content={aboutPageData.origins} />
      <Values content={aboutPageData.values} />
      <Achievements content={aboutPageData.achievements} />
      <Team content={aboutPageData.team} />
      <Footer />
    </main>
  );
}
