import { useIsMobile } from '@opengovsg/design-system-react'
import { AppPublicHeader, LandingSection } from '~/features/landing/components'
import ShortenerForm from '~/features/shortener/ShortenerForm'

const LandingPage = () => {
  const isMobile = useIsMobile()
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
