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

  const signUpMutation = trpc.auth.signUp.useMutation({
    onError: (error) => setError('email', { message: error.message }),
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
          //TODO: change to dashboard page
          toast({ title: `Welcome back, ${data?.username}` })
          await router.push(String(router.query[CALLBACK_URL_KEY] ?? HOME))
          // await router.push(HOME)
        },
      }
    )
  })

  const handleSignUp = handleSubmit(({ email, password }) => {
    return signUpMutation.mutate(
      { email, password },
      {
        onSuccess: async (data) => {
          //TODO: change to dashboard page
          toast({ title: `Sign up with email ${data?.email} successful` })
          // await router.push(String(router.query[CALLBACK_URL_KEY] ?? HOME))
        },
      }
    )
  })

  return (
    <form noValidate>
      <FormControl
        id="email"
        isRequired
        isInvalid={!!errors.email}
        isReadOnly={loginMutation.isLoading}
      >
        <FormLabel requiredIndicator={<></>}>Email</FormLabel>
        <Input placeholder="e.g. jane.doe@open.gov.sg" {...register('email')} />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="email"
        isRequired
        isInvalid={!!errors.password}
        isReadOnly={loginMutation.isLoading}
        mt="1rem"
      >
        <FormLabel requiredIndicator={<></>}>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter your password"
          {...register('password')}
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Wrap shouldWrapChildren direction="row" align="center" mt="1rem">
        <Button
          type="submit"
          isLoading={loginMutation.isLoading}
          onClick={handleSignIn}
        >
          Log in
        </Button>
        <Button
          type="submit"
          variant="outline"
          isLoading={signUpMutation.isLoading}
          onClick={handleSignUp}
        >
          Sign up
        </Button>
      </Wrap>
    </form>
  )
}
