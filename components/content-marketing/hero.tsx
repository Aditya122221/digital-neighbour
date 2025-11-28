"use client";

import { motion } from "framer-motion";
import { CustomButton } from "@/components/core/button";

interface ContentMarketingHeroProps {
  data: {
    heading: string;
    subheading: string;
  };
}

export default function ContentMarketingHero({
  data,
}: ContentMarketingHeroProps) {
  return (
    <section className="relative pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32 overflow-x-hidden min-h-screen bg-white">

      {/* Content */}
      <div className="relative z-20 container mx-auto py-6 md:py-0 px-6 lg:px-12">
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-6 max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black leading-tight font-cal-sans">
              {data.heading}
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-black leading-relaxed">
              {data.subheading}
            </p>
            <CustomButton
              text="Talk to our CONTENT MARKETING expert"
              href="/contact"
              textColor="black"
              borderColor="black"
              className="mt-6"
            />
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
    </section>
  );
}
