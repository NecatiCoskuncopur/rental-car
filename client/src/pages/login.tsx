import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Alert, Form, FormProps } from 'antd';

import { loginFormData } from '@/constants';
import { AuthFormWrapper, Button } from '@/components';
import { loginFailure, loginStart, loginSuccess } from '@/redux/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [formError, setFormError] = React.useState<string | null>(null);

  const handleSubmit: FormProps<{ email: string; password: string }>['onFinish'] = async (values: any) => {
    try {
      dispatch(loginStart());
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        const errorMessage = data.message || 'An unknown error occurred';
        setFormError(errorMessage);
        dispatch(loginFailure(errorMessage));
      } else {
        setFormError(null);
        dispatch(loginSuccess(data));
        router.push('/');
      }
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setFormError(errorMessage);
      dispatch(loginFailure(errorMessage));
    }
  };

  const data = loginFormData(form);

  return (
    <AuthFormWrapper>
      <Form
        form={form}
        name="login"
        style={{ maxWidth: 450, width: '100%' }}
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        {formError && (
          <Form.Item>
            <Alert
              message={formError}
              type="error"
              showIcon
            />
          </Form.Item>
        )}

        {data.map((item) => (
          <Form.Item<{ email: string; password: string }>
            key={item.name}
            label={item.label}
            name={item.name}
            rules={item.rules}
          >
            {item.children}
          </Form.Item>
        ))}

        <Form.Item>
          <Button
            colorVariant="dark"
            size="cozy"
            type="submit"
            fullWidth={true}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </AuthFormWrapper>
  );
};

export default Login;
