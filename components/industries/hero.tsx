"use client";

import { motion } from "framer-motion";
import { CustomButton } from "@/components/core/button";

type VideoSource =
  | string
  | {
      asset?: {
        url?: string;
      };
      url?: string;
    };

interface IndustriesHeroProps {
  data?: {
    heading?: string;
    subheading?: string;
    buttonText?: string;
    bgVideo?: VideoSource;
    video?: VideoSource;
  };
  defaultVideoSrc?: string | null;
}

const FALLBACK_VIDEO = "/industry/heroVideo.webm";

export default function IndustriesHero({
  data,
  defaultVideoSrc,
}: IndustriesHeroProps) {
  const heading = data?.heading || "Home Services";
  const subheading = data?.subheading || "Choose your industry.";
  const buttonText = data?.buttonText || "Talk to our experts";

  const resolveVideoSrc = (source?: VideoSource) => {
    if (!source) return undefined;
    if (typeof source === "string") return source;
    return source.asset?.url || source.url;
  };

  const heroVideoSrc =
    resolveVideoSrc(data?.bgVideo) ||
    resolveVideoSrc(data?.video) ||
    (defaultVideoSrc ?? undefined) ||
    FALLBACK_VIDEO;

  return (
    <section
      className="relative overflow-hidden pt-24 md:pt-32 lg:pt-40 min-h-[360px] md:min-h-[520px] lg:min-h-[660px]"
      style={{
        paddingBottom: "20px",
        paddingLeft: "12px",
        paddingRight: "12px",
      }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src={heroVideoSrc}
        >
          Your browser does not support the video tag.
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 w-full px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="pointer-events-none select-none flex flex-col items-center text-center"
        >
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-cal-sans font-semibold tracking-tight">
            {(() => {
              const words = heading.split(/\s+/);
              const firstWord = words[0] || "";
              const restWords = words.slice(1).join(" ");
              return (
                <>
                  <span style={{ color: "#5D50EB" }}>{firstWord}</span>
                  {restWords && <span> {restWords}</span>}
                </>
              );
            })()}
          </h1>
          <p className="mt-4 text-white/90 text-lg md:text-xl">{subheading}</p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.2,
            }}
            className="mt-6 pointer-events-auto"
          >
            <CustomButton
              text={buttonText}
              href="/contact"
              textColor="white"
              borderColor="white"
            />
          </motion.div>
        </motion.div>
      </div>
      {/* Bottom shadow divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
    </section>
  );
}
