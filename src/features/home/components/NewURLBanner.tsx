import { useToast } from '@chakra-ui/react'
import ShortenerInput from '~/features/shortener/ShortenerInput'
import { trpc } from '~/utils/trpc'

export const NewURLBanner = (): JSX.Element => {
  const utils = trpc.useContext()
  const toast = useToast()

  const handleShortenerInputSuccess = async () => {
    toast({ description: 'URL shortened!', status: 'success' })
    await utils.url.invalidate()
  }

  return <ShortenerInput onSuccess={handleShortenerInputSuccess} />
}
