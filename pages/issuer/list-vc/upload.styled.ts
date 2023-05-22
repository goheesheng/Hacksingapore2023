import styled from 'styled-components';

import { pxToRem } from 'utils';
import { Button } from 'components';

export const ButtonWrapper = styled(Button)`

  @media (max-width: 1024px) {
    margin-top: ${pxToRem(40)};
  }
`;
