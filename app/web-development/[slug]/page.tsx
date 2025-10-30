import React from "react";
import { notFound } from "next/navigation";
import webDevData from "@/data/web-development.json";
import WebDevHero from "@/components/web-development/hero";
import Functionalities from "@/components/web-development/functionalities";
import SeoContent from "@/components/seo/content";
import SeoServices from "@/components/seo/services";
import SeoForm from "@/components/seo/form";
import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import BrandsMarquee from "@/components/homepage/brandsmarquee";
import Process2 from "@/components/homepage/process2";
import SeoCta from "@/components/seo/cta";
 
import OtherServices from "@/components/seo/otherservices";
import SeoFaq from "@/components/seo/faq";
import CaseStudy from "@/components/homepage/casestudy";

const allowedSlugs = [
  "web-development",
  "website-development",
  "web-app-development",
  "ecommerce-development",
  "landing-page-development",
];

export default function WebDevSlugPage({ params }: { params: { slug: string } }) {
  if (!allowedSlugs.includes(params.slug)) {
    notFound();
  }

  const currentData = (webDevData as any)[params.slug as keyof typeof webDevData] as any;

  return (
    <main>
      <div className="relative">
        <Navbar />
        <WebDevHero data={currentData?.hero || { heading: "High-Performance Web Development", subheading: "We design, build, and scale fast, secure, and conversion-focused websites and web apps." }} />
      </div>
      <SeoForm data={currentData?.form} />
      <BrandsMarquee />
      <Functionalities />
  <SeoServices data={ currentData?.services } serviceCards = { currentData?.serviceCards } basePath = "/web-development" />
  <Process2 data={currentData?.services} processData={currentData?.process || (webDevData as any)['web-development']?.process} />
      <SeoContent data={currentData?.content} />
      <CaseStudy />
      <OtherServices />
      <SeoFaq data={currentData?.faq} />
      <SeoCta data={currentData?.services} />
      <Footer />
    </main>
  );
}


