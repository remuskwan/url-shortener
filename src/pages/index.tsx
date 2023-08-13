import { AppPublicHeader, LandingSection } from '~/features/landing/components'
import { ShortenerForm } from '~/features/shortener/Shortener'

const LandingPage = () => {
  return (
    <>
      <AppPublicHeader />
      <LandingSection bg="base.canvas.brand-subtle">
        <ShortenerForm />
      </LandingSection>
    </>
  )
}

export default LandingPage
