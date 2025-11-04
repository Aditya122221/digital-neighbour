"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CustomButton } from "@/components/core/button";

export default function Hero5() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for dissolve effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Transform scroll progress to opacity and scale
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  return (
    <section
      ref={heroRef}
      className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/homepage/hero-bg3.jpg')`,
        }}
      />

      {/* Gradient from both sides to center overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green3 via-green1 to-green3" />

      {/* Hero content */}
      <motion.div
        className="relative z-20 max-w-5xl mx-auto px-6 text-center"
        style={{
          opacity: textOpacity,
          scale: textScale,
          y: textY,
        }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-balance text-white text-center font-cal-sans tracking-wide">
          {"Borderless ".split(" ").map((word, wordIndex) => {
            if (!word) return null;
            let charOffset = "Borderless ".split(" ").slice(0, wordIndex).join(" ").length + (wordIndex > 0 ? 1 : 0);
            return (
              <span key={wordIndex} className="inline-block mr-[0.25em]">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5 + (charOffset + charIndex) * 0.05,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            );
          })}
          <motion.span
            className="inline-block w-8 h-10 md:w-12 md:h-12 lg:w-32 lg:h-18 -mb-1 md:-mb-2 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border-2 border-white/30 mx-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: 1,
              x: [0, 2, -1, 1, 0],
              y: [0, -1, 2, -1, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] },
              x: { duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 4 },
            }}
          >
            <img
              src="/homepage/hero/1.jpg"
              alt="Hero image 1"
              className="w-full h-full object-cover"
            />
          </motion.span>
          {"Marketing".split(" ").map((word, wordIndex) => {
            if (!word) return null;
            let charOffset = "Marketing".split(" ").slice(0, wordIndex).join(" ").length + (wordIndex > 0 ? 1 : 0);
            return (
              <span key={wordIndex} className="inline-block mr-[0.25em]">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.9 + (charOffset + charIndex) * 0.05,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            );
          })}
        </h1>
        <p className="mt-8 text-lg md:text-xl lg:text-3xl font-semibold leading-tight text-pretty max-w-3xl mx-auto text-white/90 text-center">
          {"Transform your business into a ".split(" ").map((word, wordIndex) => {
            if (!word) return null;
            let charOffset = "Transform your business into a ".split(" ").slice(0, wordIndex).join(" ").length + (wordIndex > 0 ? 1 : 0);
            return (
              <span key={wordIndex} className="inline-block mr-[0.25em]">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.5 + (charOffset + charIndex) * 0.02,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            );
          })}
          <motion.span
            className="inline-block w-6 h-7 md:w-8 md:h-8 lg:w-24 lg:h-14 -mb-1 md:-mb-2 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border-2 border-white/30 mx-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: 1,
              x: [0, -2, 1, -1, 0],
              y: [0, 1, -2, 1, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] },
              x: { duration: 0.6, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 4.2 },
            }}
          >
            <img
              src="/homepage/hero/2.jpg"
              alt="Hero image 2"
              className="w-full h-full object-cover"
            />
          </motion.span>
          {"Digital Success story with ".split(" ").map((word, wordIndex) => {
            if (!word) return null;
            let charOffset = "Digital Success story with ".split(" ").slice(0, wordIndex).join(" ").length + (wordIndex > 0 ? 1 : 0);
            return (
              <span key={wordIndex} className="inline-block mr-[0.25em]">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 2.2 + (charOffset + charIndex) * 0.02,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            );
          })}
          <motion.span
            className="inline-block w-6 h-7 md:w-8 md:h-8 lg:w-24 lg:h-14 -mb-1 md:-mb-2 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border-2 border-white/30 mx-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: 1,
              x: [0, 1, -3, 2, 0],
              y: [0, 2, -1, -1, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 1.9, ease: [0.25, 0.1, 0.25, 1] },
              x: { duration: 0.6, delay: 1.9, ease: [0.25, 0.1, 0.25, 1] },
              y: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 4.4 },
            }}
          >
            <img
              src="/homepage/hero/3.jpg"
              alt="Hero image 3"
              className="w-full h-full object-cover"
            />
          </motion.span>
          {"Digital Neighbour".split(" ").map((word, wordIndex) => {
            if (!word) return null;
            let charOffset = "Digital Neighbour".split(" ").slice(0, wordIndex).join(" ").length + (wordIndex > 0 ? 1 : 0);
            return (
              <span key={wordIndex} className="inline-block mr-[0.25em]">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 2.9 + (charOffset + charIndex) * 0.02,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            );
          })}
          <motion.span
            className="inline-block w-6 h-7 md:w-8 md:h-8 lg:w-24 lg:h-14 -mb-1 md:-mb-2 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border-2 border-white/30 mx-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: 1,
              x: [0, 2, -1, 1, 0],
              y: [0, -1, 2, -1, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 2.6, ease: [0.25, 0.1, 0.25, 1] },
              x: { duration: 0.6, delay: 2.6, ease: [0.25, 0.1, 0.25, 1] },
              y: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 4.6 },
            }}
          >
            <img
              src="/homepage/hero/4.jpg"
              alt="Hero image 4"
              className="w-full h-full object-cover"
            />
          </motion.span>
        </p>

        {/* CTA Button */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 3.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <CustomButton
            text="Get Started Today"
            href="/contact"
            textColor="black"
            borderColor="white"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
