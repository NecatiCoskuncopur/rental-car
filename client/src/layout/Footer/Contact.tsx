import React from 'react';
import styled from 'styled-components';
import { FiMail, FiPhoneCall } from 'react-icons/fi';

import theme from '@/theme';
import { socialMediaData } from '@/data';
import { AnimatedList, ListItem, Title } from './styles';

const Contact = () => {
  const listVariants = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };
  return (
    <AnimatedList
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Title>Contact Info</Title>
      <ListItem hasIcon={true}>
        <a href="tel:+0(000)0000000">
          <span>
            <FiPhoneCall />
          </span>
          <p> + 0 (000) 000 0000</p>
        </a>
      </ListItem>
      <ListItem hasIcon={true}>
        <a href="mailto:info@rentalcar.com">
          <span>
            <FiMail />
          </span>
          <p>info@rentalcar.com</p>
        </a>
      </ListItem>
      <SocialWrapper>
        {socialMediaData.map((item, index) => (
          <IconWrapper
            background={item.background}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            href={item.href}
          >
            {item.icon}
          </IconWrapper>
        ))}
      </SocialWrapper>
    </AnimatedList>
  );
};

export default Contact;

const SocialWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.$4};
  margin-top: ${theme.spacing.$12};
`;

const IconWrapper = styled.a.withConfig({ shouldForwardProp: (props) => props !== 'background' })<{ background: string }>`
  width: 36px;
  height: 36px;
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.round};
  background-color: ${(props) => props.background};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 300ms all ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;
