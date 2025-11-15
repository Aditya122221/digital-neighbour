"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { AboutOriginsContent } from "@/lib/about-data";

type OriginsProps = {
  content: AboutOriginsContent;
};

export default function Origins({ content }: OriginsProps) {
  const images = content.images ?? [];
  const colSpanClasses = ["md:col-span-2", "md:col-span-3"];
  const aspectClasses = ["aspect-[4/3]", "aspect-[5/3]"];
  const sizeMap = [
    "(min-width: 768px) 40vw, 100vw",
    "(min-width: 768px) 60vw, 100vw",
  ];

  return (
    <section className="px-6 py-24 bg-white md:py-32">
      <div className="max-w-7xl mx-auto container">
        <div className="grid items-start gap-16 md:grid-cols-2">
          <motion.div
            className="flex items-start"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-cal-sans text-5xl font-medium tracking-wide text-blackbrown md:text-6xl lg:text-7xl">
              {content.title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-lg font-light leading-relaxed text-blackbrown/80">
              {content.description}
            </p>
          </motion.div>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-5">
          {images.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className={`relative overflow-hidden rounded-2xl ${
                aspectClasses[index] ?? "aspect-[4/3]"
              } ${colSpanClasses[index] ?? "md:col-span-2"}`}
            >
              <Image
                fill
                sizes={sizeMap[index] ?? "(min-width: 768px) 40vw, 100vw"}
                src={image.src}
                alt={image.alt}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
