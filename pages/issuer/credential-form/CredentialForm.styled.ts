import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Button, Input, Typography } from 'components'

export const Heading = styled(Typography)`
  margin: ${pxToRem(48)} 0 ${pxToRem(24)};
`

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const Title = styled(Typography)`
margin-bottom: ${pxToRem(24)};
`

export const InputWrapper = styled(Input)`
  margin-bottom: ${pxToRem(24)};
`

export const ButtonWrapper = styled(Button)`
  margin: ${pxToRem(40)} 0;
`
