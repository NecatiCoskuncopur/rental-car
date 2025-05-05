import theme from '@/theme';
import styled, { css } from 'styled-components';

const Tag = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: string }>`
  font-size: ${theme.typography.fontSizes.$2};
  padding: ${theme.spacing.$3} ${theme.spacing.$2};
  border-radius: 5px;
  ${(props) =>
    props.status === 'pending'
      ? css`
          background-color: rgba(255, 147, 7, 0.1);
          color: ${theme.colors.orange};
        `
      : props.status === 'confirmed'
        ? css`
            background-color: rgba(31, 188, 47, 0.1);
            color: ${theme.colors.successGreen};
          `
        : css`
            background-color: rgba(255, 0, 0, 0.1);
            color: ${theme.colors.red};
          `}
`;

const MenuButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  color: ${theme.colors.darkGray};
  border: 1px solid ${theme.colors.softGray};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export { Tag, MenuButton, IconButton };
