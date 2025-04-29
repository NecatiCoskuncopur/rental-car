import { Input, DatePicker, FormInstance } from 'antd';

import { birthDateValidations, emailValidations, passwordValidations, passwordConfirmValidations, nameValidations, surnameValidations } from '@/validations';

const registerFormData = (form: FormInstance) => [
  {
    label: 'Name',
    name: 'name' as const,
    rules: nameValidations,
    children: <Input />,
  },
  {
    label: 'Surname',
    name: 'surname' as const,
    rules: surnameValidations,
    children: <Input />,
  },

  {
    label: 'Date of Birth',
    name: 'dateofBirth' as const,
    rules: birthDateValidations(form),
    children: (
      <DatePicker
        showTime={false}
        format="DD-MM-YYYY"
      />
    ),
  },

  {
    label: 'Email',
    name: 'email' as const,
    rules: emailValidations(form),
    children: <Input />,
  },
  {
    label: 'Password',
    name: 'password' as const,
    rules: passwordValidations,
    children: <Input.Password />,
  },
  {
    label: 'Confirm Password',
    name: 'confirmPassword' as const,
    rules: passwordConfirmValidations(form),
    dependencies: ['password'],
    children: <Input.Password />,
  },
];

export default registerFormData;
