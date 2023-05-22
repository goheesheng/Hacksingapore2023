import styled from 'styled-components';

import { pxToRem } from 'utils';
import { Button } from 'components';

export const ButtonWrapper = styled(Button)`
  margin-top: ${pxToRem(48)};

  @media (max-width: 1024px) {
    margin-top: ${pxToRem(40)};
  }
`;

// ListOneVcWrapper styles
export const ListOneVcWrapper = styled.div`
  height: 100%;
  text-align: center;
`;
// ImageWrapper styles
export const ImageWrapper = styled.div`
  width: 100%;
  max-width: 600px; // Set a maximum width for the image container
  margin-bottom: 2rem;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block; // Add this property
  }
`;
