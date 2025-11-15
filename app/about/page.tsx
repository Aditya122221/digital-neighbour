import type { Metadata } from "next";
import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import AboutHero from "@/components/about/hero";
import Origins from "@/components/about/origins";
import Values from "@/components/about/values";
import Achievements from "@/components/about/achievements";
import Team from "@/components/about/team";
import { getAboutPageData } from "@/lib/about-data";

export const metadata: Metadata = {
  title: "About Us - Team Behind Your Brand's Growth | Digital Neighbour",
  description:
    "Meet the team of storytellers, strategists, and problem-solvers dedicated to helping brands grow and connect with their audiences. Learn about our values, achievements, and the people behind Digital Neighbour.",
};

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
