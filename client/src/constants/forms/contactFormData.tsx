import { Input, FormInstance } from 'antd';

import { emailValidations, messageValidations, nameValidations, phoneNumberValidations } from '@/validations';

const contactFormData = (form: FormInstance) => [
  {
    label: 'Name',
    name: 'name' as const,
    rules: nameValidations,
    children: <Input />,
  },
  {
    label: 'Email',
    name: 'email' as const,
    rules: emailValidations(form),
    children: <Input />,
  },
  {
    label: 'Phone Number',
    name: 'phoneNumber' as const,
    rules: phoneNumberValidations,
    children: <Input type="number" />,
  },
  {
    label: 'Message',
    name: 'message' as const,
    rules: messageValidations,
    children: (
      <Input.TextArea
        rows={5}
        style={{ resize: 'none' }}
      />
    ),
  },
];

export default contactFormData;
