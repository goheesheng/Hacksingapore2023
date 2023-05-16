import { format } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import * as EmailValidator from 'email-validator'
import { useRouter } from 'next/router'

import { useSendVcOfferMutation } from 'hooks/issuer/api'
import { ROUTES } from 'utils'


export const adjustForUTCOffset = (date: Date) => {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
}

export type CredentialSubjectData = {
  Owner: string
  PropertyAddress: string
  UnitNo: string
  PostalCode: string 
  Lease: string
  Email: string
  dateOfPurchase: string
}

export const initialValues: CredentialSubjectData = {
  Owner: '',
  PropertyAddress: '',
  UnitNo: '',
  PostalCode: '',
  Lease: '',
  Email: '',
  dateOfPurchase: '',
}

export const useCredentialForm = () => {
  const router = useRouter()
  const { mutate, isSuccess, isLoading, error } = useSendVcOfferMutation()

  const handleSubmit = (values: CredentialSubjectData) => {
    mutate({
      targetEmail: values.Email ,
      credentialSubject: {
        dateOfPurchase: format(
          adjustForUTCOffset(new Date(values.dateOfPurchase)),
          'yyyy-MM-dd'
        ),
        Owner: values.Owner,
        PropertyAddress: values.PropertyAddress,
        UnitNo: values.UnitNo,
        PostalCode: values.PostalCode,
        Lease: values.Lease,
        Email: values.Email,

      },
    })
  }

  useEffect(() => {
    if (isSuccess) {
      router.push(ROUTES.issuer.result)
    }
  }, [isSuccess, router])

  const validate = useCallback((values: CredentialSubjectData) => {
    const errors = {} as Partial<CredentialSubjectData>

    if (!values.Owner) {
      errors.Owner = 'Mandatory field'
    }

    if (!values.PropertyAddress) {
      errors.PropertyAddress = 'Mandatory field'
    }

    if (!values.dateOfPurchase) {
      errors.dateOfPurchase = 'Mandatory field'
    }

    if (!values.UnitNo) {
      errors.UnitNo = 'Mandatory field'
    }

    if (!values.PostalCode) {
      errors.PostalCode = 'Mandatory field'
    }
    
    if (!values.Lease) {
      errors.Lease = 'Mandatory field'
    }

    if (!values.Email) {
      errors.Email = 'Mandatory field'
    } else if (!EmailValidator.validate(values.Email)) {
      errors.Email = 'Invalid Email'
    }

    return errors
  }, [])


  return {
    handleSubmit,
    validate,
    error,
    isCreating: isLoading,
  }
}
