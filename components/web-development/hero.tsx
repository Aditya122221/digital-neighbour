"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { CustomButton } from "@/components/core/button";

type VideoSource =
  | string
  | {
      asset?: {
        url?: string;
      };
      url?: string;
    };

interface WebDevHeroProps {
  data?: {
    heading?: string;
    subheading?: string;
    bgVideo?: VideoSource;
    video?: VideoSource;
  };
  defaultVideoSrc?: string | null;
}

const FALLBACK_VIDEO = "/footer-vid.mp4";

export default function WebDevHero({ data, defaultVideoSrc }: WebDevHeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const heading = data?.heading || "High-Performance Web Development";
  const subheading =
    data?.subheading ||
    "We design, build, and scale fast, secure, and conversion-focused websites and web apps.";

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

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleIntersect: IntersectionObserverCallback = ([entry]) => {
      if (!videoElement) return;
      if (entry.isIntersecting) {
        videoElement.play().catch(() => {
          // Autoplay might be blocked; ignore errors
        });
      } else {
        videoElement.pause();
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.6,
    });

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32 overflow-x-hidden min-h-screen bg-white">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={heroVideoSrc}
        muted
        playsInline
        loop
        preload="auto"
        controls={false}
        controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
        disablePictureInPicture
        onEnded={(e) => {
          const vid = e.currentTarget;
          vid.currentTime = 0;
          vid.play().catch(() => {});
        }}
      />

      {/* Content */}
      <div className="relative z-20 container mx-auto py-6 md:py-0 px-6 lg:px-12">
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="w-full"
          >
            <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-6 text-center">
              <div className="space-y-6 max-w-3xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black leading-tight font-cal-sans">
                  {(() => {
                    const words = heading.split(/\s+/);
                    const firstWord = words[0] || "";
                    const restWords = words.slice(1).join(" ");
                    return (
                      <>
                        <span
                          style={{
                            color: "#5D50EB",
                          }}
                        >
                          {firstWord}
                        </span>
                        {restWords && <span> {restWords}</span>}
                      </>
                    );
                  })()}
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-black leading-relaxed">
                  {subheading}
                </p>
              </div>
              <div className="w-full md:w-auto md:self-center">
                <CustomButton
                  text="Talk to our WEB DEVELOPMENT expert"
                  href="/contact"
                  textColor="black"
                  borderColor="black"
                  className="mt-6 md:mt-0"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
    </section>
  );
}
