import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import theme from '@/theme';

const AnimatedList = styled(motion.ul)`
  width: calc(25% - 18px);
  @media ${theme.device.laptop} {
    width: calc(50% - 12px);
  }
  @media ${theme.device.tablet} {
    width: 100%;
  }
`;

const ListItem = styled.li.withConfig({ shouldForwardProp: (props) => props !== 'hasIcon' })<{ hasIcon: boolean }>`
  font-size: ${theme.typography.fontSizes.$2};
  color: ${theme.colors.darkGray};
  user-select: none;
  &:not(:last-child) {
    margin-bottom: ${theme.spacing.$6};
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: ${theme.borderRadius.sm};
    background-color: ${theme.colors.yellow};
    color: ${theme.colors.white};
    font-size: ${theme.typography.fontSizes.$4};
  }

  p {
    color: ${theme.colors.white};
  }

  ${(props) =>
    props.hasIcon
      ? css`
          a {
            display: flex;
            align-items: center;
            gap: ${theme.spacing.$6};
          }
        `
      : css`
          transition: all 500ms ease-in-out;
          &:hover {
            transform: translateX(10px);
            color: ${theme.colors.yellow};
          }
        `}
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSizes.$5};
  font-weight: ${theme.typography.fontWeights.medium};
  line-height: 1.2;
  position: relative;
  margin-bottom: ${theme.spacing.$11};
  color: ${theme.colors.white};
  &::before {
    content: '';
    position: absolute;
    width: 27px;
    height: 4px;
    left: 0;
    bottom: -80%;
    background-color: ${theme.colors.yellow};
  }
`;

export { AnimatedList, ListItem, Title };
