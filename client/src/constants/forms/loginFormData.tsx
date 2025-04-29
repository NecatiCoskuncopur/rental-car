import { Input, FormInstance } from 'antd';

import { emailValidations } from '@/validations';

const loginFormData = (form: FormInstance) => [
  {
    label: 'Email',
    name: 'email' as const,
    rules: emailValidations(form),
    children: <Input />,
  },
  {
    label: 'Password',
    name: 'password' as const,
    rules: [{ required: true, message: 'Password is required' }],
    children: <Input.Password />,
  },
];

export default loginFormData;
