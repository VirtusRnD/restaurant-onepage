import { useEffect } from 'react'
import { applyTheme, ACTIVE_THEME } from './themes'
import SmoothScroll from './lib/SmoothScroll'
import ScrollProgress from './components/ScrollProgress'
import { RevealGroup } from './components/Reveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import MenuCard from './components/MenuCard'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import { HERO_IMAGE, ABOUT_IMAGE, GALLERY_IMAGES } from './lib/placeholderImages'
import { SITE } from './data/site'
import { menuTeaser } from './data/menu'

// One-page layout: Hero -> About -> Menu -> Gallery -> Testimonials ->
// Reservations -> Footer, all in one scroll. Sections use Reveal/RevealGroup
// to fade/rise in as they come into view, page scrolls via Lenis (SmoothScroll).
//
// Business info and menu content come from src/data/ - don't hardcode
// them here directly.
export default function App() {
  useEffect(() => {
    applyTheme(ACTIVE_THEME)
  }, [])

  return (
    <SmoothScroll>
      <div className="font-body">
        <ScrollProgress />
        <Navbar
          logo={SITE.name}
          links={[
            { label: 'About', href: '#about' },
            { label: 'Menu', href: '#menu' },
            { label: 'Gallery', href: '#gallery' },
            { label: 'Contact', href: '#contact' },
          ]}
          ctaLabel="Reserve a Table"
        />
        <Hero
          eyebrow="Est. 2024"
          title="A Place Worth Coming Back To"
          subtitle="Seasonal menu, warm hospitality, and a room that feels like home."
          ctaLabel="View Menu"
          onCtaClick={() => {
            const target = document.querySelector('#menu')
            if (window.__lenis && target) window.__lenis.scrollTo(target)
            else target?.scrollIntoView({ behavior: 'smooth' })
          }}
          imageUrl={HERO_IMAGE}
        />

        <About
          eyebrow="Our Story"
          title="Rooted in Craft, Built on Hospitality"
          paragraphs={[
            'Ember & Oak started as a single wood-fired oven and a belief that good food starts with good sourcing.',
            'Today, every plate that leaves our kitchen still carries that same intent — seasonal, local, and unfussy.',
          ]}
          imageUrl={ABOUT_IMAGE}
        />

        <section id="menu" className="max-w-4xl mx-auto px-6 py-20">
          <RevealGroup className="grid md:grid-cols-2 gap-8">
            {menuTeaser(2).map((section) => (
              <MenuCard key={section.category} category={section.category} items={section.items} />
            ))}
          </RevealGroup>
        </section>

        <Gallery title="The Space" images={GALLERY_IMAGES} />

        <Testimonials
          reviews={[
            { quote: "Best meal we've had all year.", author: 'Jamie R.', rating: 5 },
            { quote: 'Cozy, warm, and the service was incredible.', author: 'Sam T.', rating: 5 },
            { quote: 'Our new go-to spot.', author: 'Alex M.', rating: 5 },
          ]}
        />

        <ContactForm
          title="Reserve a Table"
          subtitle="We'll confirm by email within 24 hours."
          showReservationFields
        />

        <Footer
          logo={SITE.name}
          address={SITE.address}
          phone={SITE.phone}
          hours={SITE.hours}
          social={SITE.social}
        />
      </div>
    </SmoothScroll>
  )
}
