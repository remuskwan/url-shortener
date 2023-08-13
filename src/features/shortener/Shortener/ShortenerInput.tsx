import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Wrap,
  useToast,
} from '@chakra-ui/react'
import { useZodForm } from '~/lib/form'
import { z } from 'zod'
import { type RouterOutput, trpc } from '~/utils/trpc'
import { useState } from 'react'
import { CopyAction } from '../ShortenerActions'

interface ShortenerInputProps {
  onSuccess?: (data: RouterOutput['url']['add']) => void
}

const shortenerSchema = z.object({
  originalURL: z.string().trim().min(1, 'Please enter a long url.'),
})

export const ShortenerInput: React.FC<ShortenerInputProps> = ({
  onSuccess,
}) => {
  const [newURL, setNewURL] = useState('')

  const toast = useToast()

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useZodForm({
    schema: shortenerSchema,
  })

  const addUrlMutation = trpc.url.add.useMutation({
    onSuccess: (data) => {
      toast({ description: 'URL shortened!', status: 'success' })
      setNewURL(`${window.location.href}${data.hash}`)
      if (!!onSuccess) {
        onSuccess(data)
      }
    },
    onError: (error) => setError('originalURL', { message: error.message }),
  })

  const handleSubmitInput = handleSubmit(({ originalURL }) => {
    return addUrlMutation.mutate({ originalURL })
  })

  const handleShortenAnother = () => {
    reset()
    setNewURL('')
  }

  return (
    <form onSubmit={handleSubmitInput}>
      <Stack direction="column" spacing="1rem">
        <FormControl
          id="longUrl"
          isInvalid={!!errors.originalURL}
          isReadOnly={addUrlMutation.isLoading}
        >
          <FormLabel requiredIndicator={<></>}>Enter long URL</FormLabel>
          <Input placeholder="e.g. google.com" {...register('originalURL')} />
          <FormErrorMessage>{errors.originalURL?.message}</FormErrorMessage>
        </FormControl>
        {!!newURL && (
          <FormControl id="shortUrl" isReadOnly>
            <FormLabel requiredIndicator={<></>}>Shortened URL</FormLabel>
            <InputGroup size="md">
              <Input value={newURL} />
              <InputRightElement width="4.5rem">
                <CopyAction url={newURL} />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        )}
      </Stack>

      <Wrap shouldWrapChildren direction="row" align="center" mt="1rem">
        {!!newURL ? (
          <Button onClick={handleShortenAnother}>Shorten another</Button>
        ) : (
          <Button type="submit" isLoading={addUrlMutation.isLoading}>
            {`Shorten${!!newURL ? ' another' : ''}`}
          </Button>
        )}
      </Wrap>
    </form>
  )
}
