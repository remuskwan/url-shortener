import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import ShortenerInput from './ShortenerInput'

//TODO: replace with public app name
const title = 'URL Shortener'

const ShortenerForm = () => {
  return (
    // <BackgroundBox>
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
        <ShortenerInput />
        {/* <SignInContextProvider>
                <Suspense fallback={<Skeleton w="100vw" h="100vh" />}>
                  <ShortenerInput />
                </Suspense>
              </SignInContextProvider> */}
      </Flex>
    </Box>
    // </BackgroundBox>
  )
}

export default ShortenerForm
