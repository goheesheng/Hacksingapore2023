import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { useAuthContext } from 'hooks/useAuthContext'
import { useLogOutMutation } from 'hooks/holder/api'
import { useLocalStorage } from './useLocalStorage'

export const useNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { authState, updateAuthState } = useAuthContext()
  const { clear } = useLocalStorage()
  const { mutateAsync } = useLogOutMutation()
  const { push } = useRouter()

  const isAuthorizedAsIssuer = authState.authorizedAsIssuer
  const isAuthorizedAsHolder = authState.authorizedAsHolder
  const isAuthorized = authState.authorizedAsIssuer || authState.authorizedAsHolder


  const handleGoHomePage = () => {
    push(ROUTES.home)
  }

  const handleLogOut = useCallback(async () => {
    await mutateAsync()
    clear()

    updateAuthState({
      authorizedAsIssuer: false,
      authorizedAsHolder: false,
    })
    setIsMenuOpen(false)
    push(ROUTES.home)
  }, [authState, push, updateAuthState])

  const handleApplyVC = () => {
    push(ROUTES.holder.ApplyVc)
  }
  
  const handleListVC = () => {
    push(ROUTES.issuer.listVc)
  }

  return { isMenuOpen, handleLogOut, setIsMenuOpen, handleGoHomePage,isAuthorizedAsIssuer,isAuthorizedAsHolder, isAuthorized , handleApplyVC, handleListVC}
}
