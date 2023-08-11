import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Wrap,
} from '@chakra-ui/react'
import { useZodForm } from '~/lib/form'
import { z } from 'zod'

const shortenerSchema = z.object({
  longUrl: z.string().trim().min(1, 'Please enter a long url.'),
})

const ShortenerInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm({
    schema: shortenerSchema,
  })
  return (
    //TODO: add onSubmit handler
    <form>
      <FormControl
        id="longUrl"
        isRequired
        // isInvalid={!!errors.email}
        // isReadOnly={loginMutation.isLoading}
      >
        <FormLabel requiredIndicator={<></>}>Enter long URL</FormLabel>
        <Input placeholder="e.g. google.com" {...register('longUrl')} />
        <FormErrorMessage>{errors.longUrl?.message}</FormErrorMessage>
      </FormControl>

      <Wrap shouldWrapChildren direction="row" align="center" mt="1rem">
        <Button type="submit">Shorten</Button>
      </Wrap>
    </form>
  )
}

export default ShortenerInput
