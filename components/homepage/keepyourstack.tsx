"use client"

export default function KeepYourStack() {
  const techLogos = [
    { name: "LinkedIn", icon: "💼" },
    { name: "Salesforce", icon: "☁️" },
    { name: "HubSpot", icon: "🟠" },
    { name: "Google Analytics", icon: "📊" },
    { name: "Mailchimp", icon: "🐵" },
    { name: "Asana", icon: "🔴" },
    { name: "Meta", icon: "📘" },
    { name: "Webflow", icon: "🌊" },
    { name: "ActiveCampaign", icon: "📧" },
    { name: "Shopify", icon: "🛍️" },
    { name: "Stripe", icon: "💳" },
    { name: "Slack", icon: "💬" },
  ]

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-6">
        {/* Header Content */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-blackbrown mb-6 text-balance">
            Keep your existing tech stack
          </h2>
          <p className="text-lg md:text-xl font-light text-blackbrown/80 max-w-2xl mx-auto text-pretty">
            We work with your platforms, meaning we seamlessly slot into your team
          </p>
        </div>

        {/* Tech Stack Marquee */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee-slow whitespace-nowrap py-4">
            {/* First set of logos */}
            {techLogos.map((tech, index) => (
              <div
                key={`first-${index}`}
                className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 mx-3 shadow-sm border border-gray-200 flex-shrink-0"
              >
                <span className="text-xl">{tech.icon}</span>
                <span className="text-blackbrown font-medium">{tech.name}</span>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {techLogos.map((tech, index) => (
              <div
                key={`second-${index}`}
                className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 mx-3 shadow-sm border border-gray-200 flex-shrink-0"
              >
                <span className="text-xl">{tech.icon}</span>
                <span className="text-blackbrown font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
