import { useRef } from 'react'
import { useI18n } from './i18n/I18nContext.jsx'
import { useCinematicScroll } from './hooks/useCinematicScroll.js'

import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import BridgeSection from './components/BridgeSection.jsx'
import JordanTrips from './components/JordanTrips.jsx'
import InternationalTrips from './components/InternationalTrips.jsx'
import CustomTripSection from './components/CustomTripSection.jsx'
import TrustSection from './components/TrustSection.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'

/**
 * The homepage sequence is fixed:
 * Hero → Bridge → Jordan Trips → International Trips → Custom Trips →
 * Trip Presence / Trust → Reviews → Final CTA → Footer.
 *
 * Reviews is deliberately not mounted: it renders verified customer reviews
 * only, and none exist yet. The composition is preserved, unchanged, in
 * ./components/Reviews.jsx — mount it with a `reviews` prop once real ones
 * are collected. Until then the page flows from the presence statement into
 * the final CTA, and the `#reviews` navigation entries are removed so there
 * is no dead anchor.
 */
export default function App() {
  const { dictionary } = useI18n()
  const root = useRef(null)

  // Set up once. The static composition is the source of truth; motion is
  // layered on top and never required for the page to be complete.
  useCinematicScroll(root, 'homepage')

  return (
    <div className="site" ref={root}>
      <a className="skip-link" href="#main">
        {dictionary.nav.skip}
      </a>

      <Header />

      <main id="main" tabIndex={-1}>
        <Hero />
        <BridgeSection />
        <JordanTrips />
        <InternationalTrips />
        <CustomTripSection />
        <TrustSection />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}
