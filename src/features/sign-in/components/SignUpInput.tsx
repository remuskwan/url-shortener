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
  password: z
    .string()
    .trim()
    .min(8, 'Passwords should be at least 8 characters long.'),
})

export const SignUpInput = () => {
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

  const signUpMutation = trpc.auth.signUp.useMutation({
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

  const handleSignUp = handleSubmit(({ email, password }) => {
    return signUpMutation.mutate(
      { email, password },
      {
        onSuccess: async (data) => {
          //TODO: change to dashboard page
          toast({ title: `Sign up with email ${data?.email} successful!` })
          await router.push(String(router.query[CALLBACK_URL_KEY] ?? HOME))
        },
      }
    )
  })

  return (
    <form onSubmit={handleSignUp} noValidate>
      <FormControl
        id="email"
        isRequired
        isInvalid={!!errors.email}
        isReadOnly={signUpMutation.isLoading}
      >
        <FormLabel requiredIndicator={<></>}>Email</FormLabel>
        <Input placeholder="e.g. jane.doe@gmail.com" {...register('email')} />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="password"
        isRequired
        isInvalid={!!errors.password}
        isReadOnly={signUpMutation.isLoading}
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
        <Button type="submit" isLoading={signUpMutation.isLoading}>
          Sign up
        </Button>
      </Wrap>
    </form>
  )
}
