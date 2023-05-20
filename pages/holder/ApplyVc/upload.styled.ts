import styled from 'styled-components';

import { pxToRem } from 'utils';
import { Button } from 'components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ButtonWrapper = styled(Button)`
  margin-top: ${pxToRem(48)};

  @media (max-width: 1024px) {
    margin-top: ${pxToRem(40)};
  }
`;

export const MT5 = styled.div`
  margin-top: 2rem;
`;

export const TextRight = styled.div`
  text-align: right;
`;
