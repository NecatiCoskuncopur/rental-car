import React from 'react';
import styled from 'styled-components';
import { Checkbox, Switch } from 'antd';

import theme from '@/theme';
import { Footer, Header } from '@/layout';
import { SettingsLayout } from '@/components';

const Notifications = () => {
  return (
    <SettingsLayout title="Notifications">
      <Wrapper>
        <h1>Notify Me When</h1>
        <Checkbox>Special Offers & Discounts</Checkbox>
        <Checkbox>Booking Confirmations</Checkbox>
        <Checkbox>When new car added</Checkbox>
        <ToggleWrapper>
          <div>
            <h1>Mobile Push notifications</h1>
            <p>Receive push notification when you allow the option</p>
          </div>
          <Switch
            size="small"
            defaultChecked
          />
        </ToggleWrapper>
        <ToggleWrapper>
          <div>
            <h1>Desktop notifications</h1>
            <p>Receive desktop notification when you allow the option</p>
          </div>
          <Switch
            size="small"
            defaultChecked
          />
        </ToggleWrapper>
        <ToggleWrapper>
          <div>
            <h1>Email notifications</h1>
            <p>Receive notifications through mails when you allow the option</p>
          </div>
          <Switch
            size="small"
            defaultChecked
          />
        </ToggleWrapper>
      </Wrapper>
    </SettingsLayout>
  );
};

Notifications.getLayout = (page: React.ReactElement) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);

export default Notifications;

const Wrapper = styled.div`
  background: ${theme.colors.white};
  box-shadow: 0px 4px 24px 0px rgba(225, 225, 225, 0.25);
  padding: ${theme.spacing.$7};
  margin-bottom: ${theme.spacing.$7};
  border-radius: 5px;
  h1 {
    color: ${theme.colors.blackGray};
    margin-bottom: ${theme.spacing.$5};
    font-size: ${theme.typography.fontSizes.$4};
    font-weight: ${theme.typography.fontWeights.medium};
  }

  .ant-checkbox-wrapper {
    margin: 0 ${theme.spacing.$6} ${theme.spacing.$7} 0;
  }

  .ant-checkbox-inner {
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid ${theme.colors.softGray};
  }

  .ant-checkbox-inner::after {
    width: 5px;
    height: 11px;
  }
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    color: ${theme.colors.extraDarkGray};
    margin-bottom: ${theme.spacing.$2};
  }
  p {
    color: ${theme.colors.darkGray};
  }
  &:not(:last-child) {
    margin-bottom: ${theme.spacing.$11};
  }
  .ant-switch.ant-switch-checked {
    background-color: ${theme.colors.successGreen};
    &:hover {
      background-color: ${theme.colors.successGreen};
    }
  }
`;
