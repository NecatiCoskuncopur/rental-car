import React from 'react';
import styled from 'styled-components';

import theme from '@/theme';

type AuthFormProps = {
  children: React.ReactNode;
};

const AuthFormWrapper: React.FC<AuthFormProps> = ({ children }) => {
  return (
    <Wrapper>
      <LogoWrapper>logo</LogoWrapper>
      {children}
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
