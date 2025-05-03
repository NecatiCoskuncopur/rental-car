import { Card } from 'antd';
import styled from 'styled-components';

import theme from '@/theme';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: ${theme.spacing.$7};
`;

const Content = styled.div`
  width: calc(75% - 12px);
  display: flex;
  align-items: center;
  gap: ${theme.spacing.$7};
  flex-wrap: wrap;
  @media ${theme.device.laptop} {
    width: 100%;
  }
`;

const StyledCard = styled(Card)`
  width: calc(50% - 12px);
  @media ${theme.device.tablet} {
    width: 100%;
  }
`;

const Aside = styled.aside`
  width: calc(25% - 12px);
  @media ${theme.device.laptop} {
    width: 100%;
  }
`;

export { Wrapper, Content, StyledCard, Aside };
