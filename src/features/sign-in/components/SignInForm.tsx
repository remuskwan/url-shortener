import { useCallback } from 'react'
import { useSignInContext } from './SignInContext'
import { EmailInput } from './Emailnput'

export const SignInForm = () => {
  const { setEmail } = useSignInContext()

  const handleOnSuccessEmail = useCallback(
    (email: string) => {
      setEmail(email)
    },
    [setEmail]
  )

  return <EmailInput onSuccess={handleOnSuccessEmail} />
}
