import { Box, Button, Flex, Skeleton, Text } from '@chakra-ui/react'

import { noop } from 'lodash'
import { useRouter } from 'next/router'
import Suspense from '~/components/Suspense'
import { CALLBACK_URL_KEY } from '~/constants/params'
import { env } from '~/env.mjs'
import {
  BackgroundBox,
  BaseGridLayout,
  LoginGridArea,
  SignInContextProvider,
  SignInForm,
} from '~/features/sign-in/components'
import { HOME } from '~/lib/routes'
import { trpc } from '~/utils/trpc'

const title = env.NEXT_PUBLIC_APP_NAME

const SignIn = () => {
  const router = useRouter()
  useRedirectIfSignedIn()

  return (
    <BackgroundBox>
      <BaseGridLayout flex={1}>
        <LoginGridArea>
          <Box minH={{ base: 'auto', lg: '17.25rem' }} w="100%">
            <Flex mb={{ base: '2.5rem', lg: 0 }} flexDir="column">
              <Text
                display={{ base: 'none', lg: 'initial' }}
                textStyle="responsive-heading.heavy-1280"
                mb="2.5rem"
              >
                {title}
              </Text>
              <Box display={{ base: 'initial', lg: 'none' }}>
                <Box mb={{ base: '0.75rem', lg: '1.5rem' }}>
                  <Text textStyle="h3">{title}</Text>
                </Box>
              </Box>

              <SignInContextProvider>
                <Suspense fallback={<Skeleton w="100vw" h="100vh" />}>
                  <SignInForm />
                </Suspense>
              </SignInContextProvider>
              <Button
                variant="link"
                onClick={() => router.push('/')}
                mt="2.5rem"
              >
                Back to main page
              </Button>
            </Flex>
          </Box>
        </LoginGridArea>
      </BaseGridLayout>
    </BackgroundBox>
  )
}

// This hook is only meant to be used in `sign-in` page
function useRedirectIfSignedIn() {
  const router = useRouter()

  const callbackUrl =
    router.query[CALLBACK_URL_KEY] !== undefined
      ? String(router.query[CALLBACK_URL_KEY])
      : HOME

  const { isLoading } = trpc.me.get.useQuery(undefined, {
    // Just stay on this page on error
    onError: noop,
    onSuccess: async () => {
      await router.push(callbackUrl)
    },
    // This is intentionally set to false for sign in page since we do not want the root ErrorBoundary to catch unauthorized errors
    // If we do catch it, there will be an infinite redirect to `/sign-in`
    useErrorBoundary: false,
  })

  return { isLoading }
}

export default SignIn
