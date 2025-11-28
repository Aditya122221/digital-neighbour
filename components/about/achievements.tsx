"use client";

import { motion } from "framer-motion";

import type {
  AboutAchievementStat,
  AboutAchievementsContent,
} from "@/lib/about-data";

type AchievementCardProps = AboutAchievementStat & {
  index: number;
};

function AchievementCard({ number, label, index }: AchievementCardProps) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
    >
      <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3">
        {number}
      </h3>
      <p className="text-base md:text-lg font-light text-white/80">{label}</p>
    </motion.div>
  );
}

type AchievementsProps = {
  content: AboutAchievementsContent;
};

export default function Achievements({ content }: AchievementsProps) {
  const stats = content.stats ?? [];

  return (
    <section className="py-32 px-6 bg-[#5D50EB]">
      <div className="container max-w-7xl mx-auto">
        <div className="space-y-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
                margin: "-100px",
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6 font-cal-sans tracking-wide">
                {content.title}
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
                margin: "-100px",
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
              }}
            >
              <p className="text-lg font-light text-white/80 leading-relaxed">
                {content.description}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((achievement, index) => (
              <AchievementCard
                key={`${achievement.label}-${index}`}
                number={achievement.number}
                label={achievement.label}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
