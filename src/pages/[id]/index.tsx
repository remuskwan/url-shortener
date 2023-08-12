import { Container, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { trpc } from '~/utils/trpc'

const RedirectToOriginalLoading = () => {
  return (
    <Container
      display="flex"
      h="$100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner color="interaction.main.default" fontSize="2rem" />
    </Container>
  )
}

export const RedirectToOriginal = () => {
  const router = useRouter()

  trpc.url.byHash.useSuspenseQuery(
    {
      hash: String(router.query.id),
    },
    {
      onSuccess: async ({ originalURL }) => {
        await router.replace(originalURL)
      },
      onError: async (error) => {
        // Server should return redirectUrl even on error, this function is a fallback.
        console.error(error)
        await router.replace('/')
      },
    }
  )

  return <RedirectToOriginalLoading />
}
