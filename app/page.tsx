import Hero from "@/components/homepage/hero"
import Banner from "@/components/homepage/banner"
import BrandsMarquee from "@/components/homepage/brandsmarquee"
import Services from "@/components/homepage/services"
import KeepYourStack from "@/components/homepage/keepyourstack"
import CaseStudy from "@/components/homepage/casestudy"
import Blogs from "@/components/homepage/blogs"
import Testimonials from "@/components/homepage/testimonials"
import BookACall from "@/components/homepage/bookacall"
import Footer from "@/components/core/footer"
import Navbar from "@/components/core/navbar"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Banner />
      <BrandsMarquee />
      <Services />
      <KeepYourStack />
      <CaseStudy />
      <Blogs />
      <Testimonials />
      <BookACall />
      <Footer />
    </main>
  )
}
