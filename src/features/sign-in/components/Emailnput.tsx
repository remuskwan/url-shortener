import { FormControl, FormLabel, Input, Wrap, useToast } from '@chakra-ui/react'
import { Button, FormErrorMessage } from '@opengovsg/design-system-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { z } from 'zod'
import { CALLBACK_URL_KEY } from '~/constants/params'
import { useZodForm } from '~/lib/form'
import { HOME } from '~/lib/routes'
import { trpc } from '~/utils/trpc'

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Please enter an email address.')
    .email({ message: 'Please enter a valid email address.' }),
  password: z.string().trim().min(1, 'Please enter a password.'),
})

export const EmailInput = () => {
  const toast = useToast()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useZodForm({
    schema: signInSchema,
    mode: 'onTouched',
  })

  const router = useRouter()

  const loginMutation = trpc.auth.login.useMutation({
    onError: (error) => {
      setError('email', { message: error.message })
      setError('password', { message: error.message })
    },
  })

  useEffect(() => {
    if (router.query.error) {
      setError('email', { message: String(router.query.error) })
    }
  }, [router.query.error, setError])

  const handleSignIn = handleSubmit(({ email, password }) => {
    return loginMutation.mutate(
      { email, password },
      {
        onSuccess: async (data) => {
          toast({ title: `Welcome back, ${data?.username}!` })
          await router.push(String(router.query[CALLBACK_URL_KEY] ?? HOME))
        },
      }
    )
  })

  return (
    <form onClick={handleSignIn} noValidate>
      <FormControl
        id="email"
        isRequired
        isInvalid={!!errors.email}
        isReadOnly={loginMutation.isLoading}
      >
        <FormLabel requiredIndicator={<></>}>Email</FormLabel>
        <Input placeholder="e.g. jane.doe@gmail.com" {...register('email')} />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="password"
        isRequired
        isInvalid={!!errors.password}
        isReadOnly={loginMutation.isLoading}
        mt="1rem"
      >
        <FormLabel requiredIndicator={<></>}>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter a password."
          {...register('password')}
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Wrap shouldWrapChildren direction="row" align="center" mt="1rem">
        <Button type="submit" isLoading={loginMutation.isLoading}>
          Log in
        </Button>
      </Wrap>
    </form>
  )
}
