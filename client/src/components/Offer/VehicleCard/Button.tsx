import styled, { css } from 'styled-components';

import theme from '@/theme';

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'view',
})<{ view: string }>`
  background-color: ${theme.colors.extraDarkGray};
  position: relative;
  border-radius: 5px;
  font-weight: ${theme.typography.fontWeights.medium};
  font-size: ${theme.typography.fontSizes.$3};
  color: ${theme.colors.white};
  text-align: center;
  padding: ${theme.spacing.$3} ${theme.spacing.$4};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  gap: ${theme.spacing.$3};
  cursor: pointer;
  transition: 400ms all ease-in-out;
  &:hover {
    background-color: ${theme.colors.coolSurf};
  }

  ${(props) =>
    props.view === 'list'
      ? css`
          float: right;
          @media ${theme.device.tablet} {
            width: 100%;
          }
        `
      : css`
          width: 100%;
        `}
`;

export default Button;
