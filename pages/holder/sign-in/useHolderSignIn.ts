import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useLocalStorage } from 'hooks/useLocalStorage'
import { useAuthContext } from 'hooks/useAuthContext'
import { useSignInMutation } from 'hooks/holder/api'

import { ROUTES } from 'utils'

export const useHolderSignIn = () => {
  const [username, setUsername] = useState('')
  const [inputError, setInputError] = useState<string | null>(null)
  const router = useRouter()
  const storage = useLocalStorage()
  const { updateAuthState } = useAuthContext()

  const { mutate, data, error, isLoading } = useSignInMutation()

  const validateEmail = (email: string) =>
    email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault()
    setInputError(null)
    if (!validateEmail(username)) {
      setInputError('This is not a valid email address.')
      return
    }

    updateAuthState({ username })
    mutate({ username })
  }

  useEffect(() => {
    if (data) {
      storage.setItem('signUpToken', data.token)

      if (!error) {
        router.push(ROUTES.holder.confirmSignIn)
      }
    }
  }, [data, error, router, storage])

  const disabled = !username || isLoading

  return {
    disabled,
    error,
    isLoading,

    handleSignIn,
    setUsername,
    inputError,
    setInputError,
  }
}
