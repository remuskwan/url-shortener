import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Wrap,
} from '@chakra-ui/react'
import { useZodForm } from '~/lib/form'
import { z } from 'zod'
import { type RouterOutput, trpc } from '~/utils/trpc'

type ShortenerInputProps = {
  //TODO: modify onSuccess
  onSuccess: (data: RouterOutput['url']['add']) => void
}

const shortenerSchema = z.object({
  originalURL: z.string().trim().min(1, 'Please enter a long url.'),
})

const ShortenerInput: React.FC<ShortenerInputProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useZodForm({
    schema: shortenerSchema,
  })

  const addUrlMutation = trpc.url.add.useMutation({
    onSuccess,
    onError: (error) => setError('originalURL', { message: error.message }),
  })

  const handleSubmitInput = handleSubmit(({ originalURL }) => {
    return addUrlMutation.mutate({ originalURL })
  })

  return (
    <form onSubmit={handleSubmitInput}>
      <FormControl
        id="longUrl"
        isRequired
        isInvalid={!!errors.originalURL}
        isReadOnly={addUrlMutation.isLoading}
      >
        <FormLabel requiredIndicator={<></>}>Enter long URL</FormLabel>
        <Input placeholder="e.g. google.com" {...register('originalURL')} />
        <FormErrorMessage>{errors.originalURL?.message}</FormErrorMessage>
      </FormControl>

      <Wrap shouldWrapChildren direction="row" align="center" mt="1rem">
        <Button type="submit">Shorten</Button>
      </Wrap>
    </form>
  )
}

export default ShortenerInput
