import { FC } from 'react'

import { Typography } from 'components'
import { MortarBoardIcon } from 'assets/mortar-board-icon'

import * as S from './CredentialDetails.styled'

export type CredentialDetailsProps = {
  Owner: string
  PropertyAddress: string
  UnitNo: string
  PostalCode: number 
  Lease: number
  Email: string
  dateOfPurchase: string
  qrCode: string
}

export const CredentialDetails: FC<CredentialDetailsProps> = ({
  Owner,
  PropertyAddress,
  UnitNo,
  PostalCode,
  Lease,
  Email,
  dateOfPurchase,
  qrCode,
}) => (
  <S.DetailsCard>
    <S.DataCard>
      <MortarBoardIcon />

      <S.DataCardInnerContainer justifyContent='space-between'>
        <div className='grid grid-row-3 sm:grid-row-4'>
          <S.Data variant='h5'>{Owner}</S.Data>
          <S.Data variant='s1'>{PropertyAddress}</S.Data>
        </div>

        <div className='grid sm:grid-cols-2 gap-y-7'>
          <div className='grid' style={{ marginTop: '-80px' }}>
            <Typography variant='p3'>Property Details:</Typography>
            <S.Data variant='p4'>Unit Number: {UnitNo}</S.Data>
            <S.Data variant='p4'>Postal Code: {PostalCode}</S.Data>
            <S.Data variant='p4'>Lease: {Lease} Years</S.Data>
            <S.Data variant='p4'>Email: {Email}</S.Data>
          </div>

          <div className='grid'>
            <Typography variant='p3'>Date of purchase</Typography>
            <S.Data variant='p4'>{dateOfPurchase}</S.Data>
          </div>
        </div>
      </S.DataCardInnerContainer>
    </S.DataCard>

    <S.QrCodeCard direction='row' justifyContent="center">
      <img src={qrCode} alt='QR Code' />
    </S.QrCodeCard>
  </S.DetailsCard>
)

export default CredentialDetails
