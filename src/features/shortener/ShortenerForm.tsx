import { Box, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import ShortenerInput from './ShortenerInput'
import { env } from '~/env.mjs'
import { type RouterOutput } from '~/utils/trpc'

const title = env.NEXT_PUBLIC_APP_NAME

const ShortenerForm = () => {
  const [newURL, setNewURL] = useState('')

  const toast = useToast()

  const handleShortenerInputSuccess = (data: RouterOutput['url']['add']) => {
    toast({ description: 'URL shortened!', status: 'success' })
    setNewURL(`${window.location.href}${data.hash}`)
  }

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
        <ShortenerInput onSuccess={handleShortenerInputSuccess} />
        {!!newURL.length && (
          <Box mb={{ base: '0.75rem', lg: '1.5rem' }}>
            <Text textStyle="h4">{newURL}</Text>
          </Box>
        )}
      </Flex>
    </Box>
  )
}

export default ShortenerForm
