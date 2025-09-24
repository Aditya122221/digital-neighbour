"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"

const caseStudies = [
  {
    id: 1,
    title: "Festive Green",
    bgColor: "bg-pink-200",
    textColor: "text-blackbrown",
    services: ["Website", "Brand Identity"],
    isNew: false,
  },
  {
    id: 2,
    title: "Dyslexia South",
    bgColor: "bg-junglegreen",
    textColor: "text-bone",
    services: ["Website", "Brand Identity", "Brand Implementation"],
    isNew: false,
  },
  {
    id: 3,
    title: "Evolve [25]",
    bgColor: "bg-gradient-to-br from-yellow-400 to-orange-500",
    textColor: "text-blackbrown",
    services: ["Website", "Brand Identity", "Brand Implementation"],
    isNew: true,
  },
  {
    id: 4,
    title: "Creative Studio",
    bgColor: "bg-pink-200",
    textColor: "text-blackbrown",
    services: ["Website", "Brand Identity"],
    isNew: false,
  },
]

export default function CaseStudy() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length)
  }

  const getVisibleCards = () => {
    const cards = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % caseStudies.length
      cards.push(caseStudies[index])
    }
    return cards
  }

  return (
    <section className="py-20 h-screen px-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Cards Container */}
        <div className="flex gap-6 mb-8 overflow-hidden">
          {getVisibleCards().map((study, index) => (
            <div
              key={`${study.id}-${currentIndex}-${index}`}
              className={`
                flex-shrink-0 basis-full sm:basis-[calc((100%_-_1.5rem)/2)] lg:basis-[calc((100%_-_3rem)/3)] h-[36rem] rounded-3xl p-6 relative
                ${study.bgColor} ${study.textColor}
                transition-all duration-500 ease-in-out
              `}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-medium">{study.title}</h3>
                <ArrowUpRight className="w-6 h-6" />
              </div>

              {/* Content Area - Placeholder for future content */}
              <div className="flex-1 flex items-center justify-center mb-6">
                {study.id === 3 && <div className="w-32 h-32 rounded-full border-4 border-yellow-300 opacity-50" />}
                {study.id === 2 && <div className="w-full h-32 bg-black/10 rounded-lg opacity-50" />}
              </div>

              {/* Services Tags */}
              <div className="flex flex-wrap gap-2">
                {study.isNew && (
                  <span className="px-3 py-1 bg-yellow-400 text-blackbrown text-sm rounded-full font-medium">New</span>
                )}
                {study.services.map((service) => (
                  <span
                    key={service}
                    className={`
                      px-3 py-1 text-sm rounded-full font-medium
                      ${
                        study.id === 2
                          ? "bg-white/20 text-bone"
                          : study.id === 3
                            ? "bg-white/30 text-blackbrown"
                            : "bg-blackbrown/10 text-blackbrown"
                      }
                    `}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-blackbrown text-bone rounded-full flex items-center justify-center hover:bg-blackbrown/80 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-blackbrown text-bone rounded-full flex items-center justify-center hover:bg-blackbrown/80 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
