import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Form } from 'antd';

import { registerFormData } from '@/constants';
import { AuthFormWrapper, Button, FormGrid } from '@/components';
import { registerFailure, registerStart, registerSuccess } from '@/redux/userSlice';

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const formRef = useRef(form);

  const handleSubmit = async (values: { name: string; surname: string; dateofBirth: string; email: string; password: string; confirmPassword: string }) => {
    try {
      dispatch(registerStart());
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.success === false) {
        if (data.message.includes('E11000 duplicate key error') && data.message.includes('email')) {
          form.setFields([
            {
              name: 'email',
              errors: ['This email is already in use.'],
            },
          ]);
        } else {
          dispatch(registerFailure(data.message));
        }
      } else if (res.ok) {
        dispatch(registerSuccess(data));
        router.push('/login');
      }
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(registerFailure(errorMessage));
    }
  };

  const data = registerFormData(form);

  return (
    <AuthFormWrapper>
      <Form
        form={form}
        name="register"
        ref={formRef}
        style={{ maxWidth: 600, width: '100%' }}
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <FormGrid>
          {data.map((item) => (
            <Form.Item<{ name: string; surname: string; dateofBirth: string; email: string; password: string; confirmPassword: string }>
              key={item.name}
              label={item.label}
              name={item.name}
              rules={item.rules}
              dependencies={item.dependencies}
            >
              {item.children}
            </Form.Item>
          ))}
        </FormGrid>
        <Form.Item>
          <Button
            colorVariant="dark"
            size="cozy"
            type="submit"
            fullWidth={true}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </AuthFormWrapper>
  );
};

export default Register;
