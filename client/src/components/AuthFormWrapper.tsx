import React from 'react';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { Typography } from 'antd';

import theme from '@/theme';
import Logo from './Logo';

const { Link } = Typography;

type AuthFormProps = {
  children: React.ReactNode;
};

const AuthFormWrapper: React.FC<AuthFormProps> = ({ children }) => {
  const pathname = usePathname();
  const isLogin = pathname === '/login';

  return (
    <Wrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      {children}
      <FormFooter isLogin={isLogin}>
        {isLogin ? (
          <>
            <Link href="/register">Don't you have an account? Register</Link>
            <Link href="/forgotPassword">Forgot password?</Link>
          </>
        ) : (
          <>
            <Link href="/login">Already a member? Login</Link>
            <Link href="/forgotPassword">Forgot password?</Link>
          </>
        )}
      </FormFooter>
    </Wrapper>
  );
};

export default AuthFormWrapper;

const Wrapper = styled.section`
  padding: ${theme.spacing.$14} ${theme.spacing.$5};
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  h1 {
    text-align: left;
    margin-bottom: ${theme.spacing.$8};
  }

  .ant-btn {
    width: 100%;
  }
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const FormFooter = styled.footer.withConfig({
  shouldForwardProp: (prop) => prop !== 'isLogin',
})<{ isLogin: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: ${({ isLogin }) => (isLogin ? '450px' : '600px')};

  @media ${theme.device.tablet} {
    flex-direction: column;
    gap: ${theme.spacing.$3};
  }
`;
