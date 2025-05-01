import React from 'react';
import styled from 'styled-components';
import { Form } from 'antd';

import theme from '@/theme';
import { Button } from '@/components';
import { contactFormData } from '@/constants';

const ContactForm: React.FC = () => {
  const [form] = Form.useForm();
  const handleSubmit = () => {};

  const data = contactFormData(form);
  return (
    <StyledForm
      form={form}
      name="contact"
      initialValues={{ remember: true }}
      layout="vertical"
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <h1>Get In Touch</h1>

      {data.map((item) => (
        <Form.Item
          key={item.name}
          label={item.label}
          name={item.name}
          rules={item.rules}
        >
          {item.children}
        </Form.Item>
      ))}

      <Button
        colorVariant="dark"
        type="submit"
        size="spacious"
      >
        Send
      </Button>
    </StyledForm>
  );
};

export default ContactForm;

const StyledForm = styled(Form)`
  width: 50%;
  padding: ${theme.spacing.$7};
  border: 2px solid ${theme.colors.lightGray};
  h1 {
    margin-bottom: ${theme.spacing.$8};
    color: ${theme.colors.darkNavy};
    font-size: ${theme.typography.fontSizes.$9};
    font-weight: ${theme.typography.fontWeights.bold};
  }
  @media ${theme.device.laptop} {
    width: 100%;
  }
`;
