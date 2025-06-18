import { Input, FormInstance } from 'antd';

import { emailValidations } from '@/validations';

const loginFormData = (form: FormInstance) => [
  {
    label: 'Email',
    name: 'email' as const,
    rules: emailValidations(form),
    children: <Input autoComplete="email" />,
  },
  {
    label: 'Password',
    name: 'password' as const,
    rules: [{ required: true, message: 'Password is required' }],
    children: <Input.Password autoComplete="current-password" />,
  },
];

export default loginFormData;
