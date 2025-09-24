"use client"

export default function Services() {
  return (
    <section className="bg-bone/30">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Sticky text */}
        <div className="w-full lg:w-1/2 p-6 lg:p-16">
          <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center lg:justify-center">
            <div>
              <h2 className="md:text-6xl text-4xl font-regular text-blackbrown mb-8 leading-tight">Services</h2>
              <p className="md:text-xl text-lg text-blackbrown font-light leading-relaxed max-w-lg">
                We offer big agency services at <span></span>small agency prices. Focused on three core disciplines we use our
                expertise to help you uncover your business needs, create traction and accelerate growth.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Naturally scrolling cards */}
        <div className="w-full lg:w-1/2">
          <div className="md:py-16 py-8 px-8 space-y-8">
            {/* Marketing Card */}
            <div className="bg-junglegreen rounded-3xl shadow-2xl p-12 md:h-150 h-100 flex items-center justify-center">
              <h3 className="text-4xl font-bold text-bone">Marketing</h3>
            </div>

            {/* Development Card */}
            <div className="bg-darkbeige rounded-3xl shadow-2xl p-12 md:h-150 h-100 flex items-center justify-center">
              <h3 className="text-4xl font-bold text-blackbrown">Development</h3>
            </div>

            {/* Automation Card */}
            <div className="bg-blackbrown rounded-3xl shadow-2xl p-12 md:h-150 h-100 flex items-center justify-center">
              <h3 className="text-4xl font-bold text-bone">Automation</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
