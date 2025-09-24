import CustomButton from '../core/button';

export default function BookACall() {
  return (
    <div className="bg-gray-100 py-16 px-6 lg:px-20">
    <section className="bg-junglegreen py-16 px-6 rounded-3xl shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Hand-drawn illustrations */}
          <div className="flex-1 flex items-center justify-center gap-8 order-1 lg:order-1">
          

            {/* Laptop */}
            <div className="relative">
              <svg width="100" height="80" viewBox="0 0 100 80" fill="none" className="text-cream">
                <rect x="10" y="15" width="60" height="40" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
                <rect x="15" y="20" width="50" height="30" fill="currentColor" opacity="0.1" />
                <path
                  d="M5 55H75C77 55 78 56 78 58V62C78 64 77 65 75 65H5C3 65 2 64 2 62V58C2 56 3 55 5 55Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="40" cy="60" r="2" fill="currentColor" />
                {/* Screen reflection lines */}
                <path d="M20 25L25 30" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <path d="M25 25L30 30" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              </svg>
            </div>

          </div>

          {/* Right side - Content */}
          <div className="flex-1 text-cream text-darkbeige order-2 lg:order-2 text-center lg:text-left">
            <h2 className="md:text-6xl text-4xl font-light mb-6 text-balance">Book a call now.</h2>

            <p className="text-xl mb-4 font-light text-pretty">Let's talk about what's holding your growth back.</p>

            <p className="text-lg mb-8 font-light text-pretty opacity-90">
              No sales pitch, just a genuine conversation with our agency's director about your business.
            </p>

            <CustomButton text="Book a call" textColor="white" borderColor="white" />
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
