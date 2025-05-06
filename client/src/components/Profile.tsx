import React from 'react';
import styled from 'styled-components';
import { Form, FormInstance, Input } from 'antd';

import theme from '@/theme';
import { addressFormData, userUpdateFormData } from '@/constants';
import Button from './Button';
import FormGrid from './FormGrid';

type ProfileContentProps = {
  form: FormInstance;
};

const ProfileContent: React.FC<ProfileContentProps> = ({ form }) => {
  const basicInfoData = userUpdateFormData(form);
  const addressData = addressFormData(form);

  return (
    <>
      <FormSection>
        <header>
          <h1>Basic Information</h1>
        </header>
        <StyledFormGrid>
          {basicInfoData.map((item) => (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              rules={item.rules}
            >
              {item.children}
            </Form.Item>
          ))}
        </StyledFormGrid>
      </FormSection>
      <FormSection>
        <header>
          <h1>Address Information</h1>
        </header>
        <Form.Item
          label="Address"
          style={{ padding: '0 16px' }}
        >
          <Input.TextArea
            rows={3}
            style={{ resize: 'none' }}
          />
        </Form.Item>
        <StyledFormGrid>
          {addressData.map((item) => (
            <Form.Item
              key={item.label}
              label={item.label}
            >
              {item.children}
            </Form.Item>
          ))}
        </StyledFormGrid>
      </FormSection>
      <ButtonWrapper>
        <Form.Item>
          <Button
            colorVariant="light"
            size="spacious"
            type="submit"
          >
            Save Changes
          </Button>
        </Form.Item>
      </ButtonWrapper>
    </>
  );
};

export default ProfileContent;

const FormSection = styled.div`
  border-radius: 5px;
  border: 1px solid ${theme.colors.softGray};
  margin-bottom: ${theme.spacing.$7};
  header {
    padding: ${theme.spacing.$5};
    background-color: ${theme.colors.lightGray};
    margin-bottom: ${theme.spacing.$6};
    color: ${theme.colors.blackGray};
  }
  h1 {
    font-size: ${theme.typography.fontSizes.$5};
    font-weight: ${theme.typography.fontWeights.medium};
  }
`;

const StyledFormGrid = styled(FormGrid)`
  padding: 0 ${theme.spacing.$5};
`;

const ButtonWrapper = styled.div`
  float: right;
`;
