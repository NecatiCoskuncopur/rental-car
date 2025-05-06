import React from 'react';
import styled from 'styled-components';
import { Select } from 'antd';

import theme from '@/theme';
import { Footer, Header } from '@/layout';
import { SettingsLayout } from '@/components';

const Preferences = () => {
  return (
    <SettingsLayout title="Preferences">
      <Wrapper>
        <TextWrapper>
          <h1>Language</h1>
          <p>Select display language</p>
        </TextWrapper>
        <CustomSelect
          defaultValue="1"
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          options={[
            { value: '1', label: 'English' },
            { value: '2', label: 'Turkish' },
          ]}
        />
      </Wrapper>
      <Wrapper>
        <TextWrapper>
          <h1>Region / Locale</h1>
          <p>Select region</p>
        </TextWrapper>
        <CustomSelect
          defaultValue="1"
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          options={[
            { value: '1', label: 'Turkiye' },
            { value: '2', label: 'United States' },
          ]}
        />
      </Wrapper>
    </SettingsLayout>
  );
};

Preferences.getLayout = (page: React.ReactElement) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);

export default Preferences;

const Wrapper = styled.div`
  padding: ${theme.spacing.$5};
  margin-bottom: ${theme.spacing.$6};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${theme.colors.softGray};
`;

const TextWrapper = styled.div`
  h1 {
    color: ${theme.colors.blackGray};
    margin-bottom: ${theme.spacing.$2};
    font-size: ${theme.typography.fontSizes.$4};
    font-weight: ${theme.typography.fontWeights.medium};
  }
  p {
    color: ${theme.colors.darkGray};
  }
`;

const CustomSelect = styled(Select)`
  .ant-select-selector {
    min-width: 200px;
    font-size: ${theme.typography.fontSizes.$2} !important;
    @media ${theme.device.tablet} {
      min-width: 100px;
    }
  }
`;
