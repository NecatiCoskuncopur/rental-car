import styled from 'styled-components';

import theme from '@/theme';

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.$5};
  margin-bottom: ${theme.spacing.$6};
  @media ${theme.device.tablet} {
    grid-template-columns: 1fr;
  }
  .ant-form-item {
    margin-bottom: 0;
  }
`;

export default FormGrid;
