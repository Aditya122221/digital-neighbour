"use client"
import { useState } from "react"
import { Users, Award, TrendingUp, Play } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function Banner() {
  const [open, setOpen] = useState(false)
  const YT_ID = "h_D3VFfhvs4"

  return (
    <div className="bg-gray-100 py-16 px-6 lg:px-20">
      <section
        className="relative py-16 px-6 lg:py-24 lg:px-12 rounded-3xl overflow-hidden shadow-2xl"
        style={{
          backgroundImage: `url(https://i.ytimg.com/vi/${YT_ID}/hqdefault.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* right-side gradient overlay for readability */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-black/90 to-black/50" />
        <div className="max-w-7xl mx-auto">
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Play button positioned where circles used to be */}
            <div className="relative flex justify-center lg:justify-center">
              <button
                aria-label="Play video"
                onClick={() => setOpen(true)}
                className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-full bg-junglegreen text-bone hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-bone/40"
              >
                <Play className="w-10 h-10" />
              </button>
            </div>

            {/* Right side - Content */}
            <div className="relative z-10 space-y-8">
              {/* Main text */}
              <p className="text-bone text-lg lg:text-xl leading-relaxed font-light">
                At Digital Neighbour, we're dedicated to helping businesses achieve more fulfilling digital success. Our
                experienced marketing specialists bring expertise and innovation to transform your online presence.
              </p>

              {/* Values */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-bone" />
                  <span className="text-bone font-light font-sans">Innovation</span>
                </div>

                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-bone" />
                  <span className="text-bone font-light font-sans">Excellence</span>
                </div>

                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-bone" />
                  <span className="text-bone font-light font-sans">Growth</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-5xl p-0 overflow-hidden">
            <AspectRatio ratio={16 / 9}>
              {open && (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&rel=0`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
            </AspectRatio>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  )
}
