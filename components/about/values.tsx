"use client";

import { motion } from "framer-motion";

import type { AboutValueItem, AboutValuesContent } from "@/lib/about-data";

type ValueCardProps = AboutValueItem & {
  index: number;
};

function ValueCard({ title, description, index }: ValueCardProps) {
  return (
    <motion.div
      className="pb-12 border-b border-gray-200 last:border-b-0"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
    >
      <h3 className="text-xl md:text-5xl lg:text-6xl font-bold text-blackbrown mb-4 font-cal-sans tracking-wide">
        {title}
      </h3>
      <p className="text-base font-light text-blackbrown/80 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

type ValuesProps = {
  content: AboutValuesContent;
};

export default function Values({ content }: ValuesProps) {
  const valueItems = content.items ?? [];

  return (
    <section className="py-32 px-6 bg-white">
      <div className="container max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            className="flex items-start"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-blackbrown font-cal-sans tracking-wide">
              {content.title}
            </h2>
          </motion.div>

          <div className="space-y-0">
            {valueItems.map((value, index) => (
              <ValueCard
                key={`${value.title}-${index}`}
                title={value.title}
                description={value.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
