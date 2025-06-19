import React, { useState } from 'react';
import styled from 'styled-components';
import { Form } from 'antd';

import theme from '@/theme';
import { Footer, Header } from '@/layout';
import { Button, DeleteAccount, PasswordChange, SettingsLayout } from '@/components';

const Security = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [form] = Form.useForm();

  const openModal = (modalKey: string) => setActiveModal(modalKey);
  const closeModal = () => {
    form.resetFields();
    setActiveModal(null);
  };

  return (
    <SettingsLayout title="Security">
      <Wrapper>
        <h1>Password</h1>
        <Button
          colorVariant="dark"
          onClick={() => openModal('passwordChange')}
          size="compact"
        >
          Change
        </Button>
      </Wrapper>

      <Wrapper>
        <h1>Delete Account</h1>
        <Button
          colorVariant="danger"
          onClick={() => openModal('deleteAccount')}
          size="compact"
        >
          Delete
        </Button>
      </Wrapper>
      {activeModal === 'passwordChange' && (
        <PasswordChange
          isModalVisible={activeModal === 'passwordChange'}
          handleClose={closeModal}
        />
      )}

      {activeModal === 'deleteAccount' && (
        <DeleteAccount
          isModalVisible={activeModal === 'deleteAccount'}
          handleClose={closeModal}
        />
      )}
    </SettingsLayout>
  );
};

Security.getLayout = (page: React.ReactElement) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);

export default Security;

const Wrapper = styled.div`
  padding: ${theme.spacing.$5};
  margin-bottom: ${theme.spacing.$7};
  border: 1px solid ${theme.colors.softGray};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: ${theme.typography.fontSizes.$4};
    font-weight: ${theme.typography.fontWeights.medium};
  }
`;
