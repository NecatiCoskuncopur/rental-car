import theme from '@/theme';
import styled, { css } from 'styled-components';

const { colors, spacing, typography } = theme;

type ButtonProps = {
  colorVariant?: 'dark' | 'light' | 'danger';
  hasIcon?: boolean;
  size: 'compact' | 'cozy' | 'spacious';
  fullWidth?: boolean;
};

const colorStyles = {
  dark: css`
    background-color: ${colors.extraDarkGray};
    border: 1px solid ${colors.extraDarkGray};
    &:hover {
      color: ${colors.bgDark};
    }
  `,
  light: css`
    background-color: ${colors.warningOrange};
    border: 1px solid ${colors.warningOrange};
    &:hover {
      color: ${colors.warningOrange};
    }
  `,
  danger: css`
    background-color: ${colors.red};
    border: 1px solid ${colors.red};
    &:hover {
      color: ${colors.red};
    }
  `,
};

const iconStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.$3};
`;

const sizeStyles = {
  compact: css`
    padding: 3px ${spacing.$6};
  `,
  cozy: css`
    padding: ${spacing.$4};
  `,
  spacious: css`
    padding: ${spacing.$4} ${spacing.$5};
  `,
};

const Button = styled('button').withConfig({
  shouldForwardProp: (prop) => !['colorVariant', 'hasIcon', 'size', 'fullWidth'].includes(prop as string),
})<ButtonProps>`
  color: ${colors.white};
  box-shadow: inset 0 0 0 0 ${colors.white};
  font-size: ${typography.fontSizes.$3};
  font-weight: ${typography.fontWeights.semiBold};
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Fira Sans', sans-serif;
  transition: 500ms all ease-in-out;
  position: relative;
  &:hover {
    background-color: ${colors.white};
    box-shadow: inset 0 50px 0 0 ${colors.white};
  }
  width: ${(props) => props.fullWidth && '100%'};
  ${({ size }) => size && sizeStyles[size]}
  ${({ colorVariant = 'dark' }) => colorStyles[colorVariant]}
  ${({ hasIcon = false }) => hasIcon && iconStyles}
`;

export default Button;
