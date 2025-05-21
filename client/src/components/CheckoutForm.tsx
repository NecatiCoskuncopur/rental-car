import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, FormInstance, Input, Select } from 'antd';

import theme from '@/theme';
import { emailValidations, nameValidations, phoneNumberValidations, surnameValidations } from '@/validations';
import FormGrid from './FormGrid';

type CheckoutFormProps = {
  formRef: React.MutableRefObject<FormInstance<any>>;
};

type Country = {
  name: string;
  code: string;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ formRef }) => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        const mapped: Country[] = data.map((country: any) => ({
          name: country.name.common,
          code: country.cca2,
        }));

        const sorted = mapped.sort((a: Country, b: Country) => a.name.localeCompare(b.name));

        setCountries(sorted);
      })
      .catch(() => setCountries([]));
  }, []);

  return (
    <>
      <Title>Billing Details</Title>
      <FormGrid>
        <Form.Item
          label="Name"
          name="name"
          rules={nameValidations}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Surname"
          name="surname"
          rules={surnameValidations}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={phoneNumberValidations}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={emailValidations(formRef.current)}
        >
          <Input />
        </Form.Item>
      </FormGrid>
      <Form.Item
        label="Company Name"
        name="companyName"
        rules={[]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Country"
        name="country"
        rules={[]}
      >
        <Select
          showSearch
          optionFilterProp="label"
          placeholder="Select a country"
          style={{ height: '40px' }}
          options={countries.map((c) => ({
            label: c.name,
            value: c.name,
          }))}
        />
      </Form.Item>

      <Form.Item
        label="City"
        name="city"
        rules={[]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="ZIP Code"
        name="zipCode"
        rules={[]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Order Notes"
        name="orderNotes"
        rules={[]}
      >
        <Input.TextArea
          rows={4}
          placeholder="Add any special notes..."
        />
      </Form.Item>
    </>
  );
};

export default CheckoutForm;

const Title = styled.h1`
  font-size: ${theme.typography.fontSizes.$5};
  font-weight: ${theme.typography.fontWeights.medium};
  margin-bottom: ${theme.spacing.$5};
  color: ${theme.colors.darkerGray};
`;
