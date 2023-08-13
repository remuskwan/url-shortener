import { Box, Flex, Text } from '@chakra-ui/react'
import { env } from '~/env.mjs'
import { ShortenerInput } from './ShortenerInput'

const title = env.NEXT_PUBLIC_APP_NAME

export const ShortenerForm = () => {
  return (
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
      </Flex>
    </Box>
  )
}
