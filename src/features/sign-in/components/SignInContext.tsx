import { type SetStateAction } from 'jotai'
import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react'

type SignInStates = {
  email: string
  setEmail: Dispatch<SetStateAction<string>>
}

export const SignInContext = createContext<SignInStates | undefined>(undefined)

export const useSignInContext = () => {
  const context = useContext(SignInContext)

  if (context === undefined) {
    throw new Error(
      `Must use sign in context within ${SignInContextProvider}.name`
    )
  }

  return context
}

export const SignInContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [email, setEmail] = useState('')

  return (
    <SignInContext.Provider
      value={{
        email,
        setEmail,
      }}
    >
      {children}
    </SignInContext.Provider>
  )
}
