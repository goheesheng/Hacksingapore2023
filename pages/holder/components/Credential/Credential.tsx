import { FC } from 'react'
import { format } from 'date-fns'
import { Header } from 'components'
import { ROUTES } from 'utils'

import CredentialDetails from '../CredentialDetails/CredentialDetails'

import * as S from './Credential.styled'

export type CredentialProps = {
  credentialSubject: any
  qrCode?: string
}

export const renderLiteral = (value: unknown): string => {
  if (typeof value !== 'string') {
    return `${value}`
  }

  const parsedDate = Date.parse(value)
  if (!parsedDate) {
    return value
  }

  const d = new Date(parsedDate)
  return d.toDateString()
}

const getDetails = ({
  detailsObject,
  nested = false,
  qrCode,
}: {
  detailsObject: any
  nested?: boolean
  qrCode?: string
}) => {
  if (Array.isArray(detailsObject)) {
    return (
      <S.Div nested={nested}>
        {detailsObject.map((value, index) => (
          <S.Div key={index}>
            {getDetails({ detailsObject: value, nested: true })}
          </S.Div>
        ))}
      </S.Div>
    )
  }

  if (typeof detailsObject === 'object' && detailsObject !== null) {
    return (
      qrCode && (
        <CredentialDetails
          Owner={detailsObject.Owner}
          PropertyAddress={detailsObject.PropertyAddress}
          UnitNo={detailsObject.UnitNo}
          PostalCode={detailsObject.PostalCode}
          Lease={detailsObject.Lease}
          dateOfPurchase={format(
            new Date(detailsObject.dateOfPurchase),
            'dd.MM.yyyy'
          )}
          Email={detailsObject.Email}
          qrCode={qrCode}
        />
      )
    )
  }

  return <S.Div>{renderLiteral(detailsObject)}</S.Div>
}

export const Credential: FC<CredentialProps> = ({
  credentialSubject,
  qrCode,
}) => {
  return <>
    <S.HeaderContainer>
      <Header
        title='Certificate details'
        path={ROUTES.holder.home}
        hasBackIcon
      />
    </S.HeaderContainer>

    <S.Container>
      {getDetails({ detailsObject: credentialSubject, qrCode })}
    </S.Container>
  </>
}
