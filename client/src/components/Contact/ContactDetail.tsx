import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import theme from '@/theme';
import { contactDetailData } from '@/data';
import Container from '../Container';

const ContactDetail: React.FC = () => {
  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <Container>
      <List
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        {contactDetailData.map((item, index) => (
          <ListItem key={index}>
            <IconWrapper>{item.icon}</IconWrapper>
            <h1>{item.title}</h1>
            <Link href={item.href}>{item.text}</Link>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ContactDetail;

const List = styled(motion.ul)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.$7};
  flex-wrap: wrap;
`;

const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSizes.$6};
  background-color: ${theme.colors.orange};
  color: ${theme.colors.white};
  margin-bottom: ${theme.spacing.$2};
  transition: 500ms all ease-in-out;
`;

const Link = styled.a`
  font-size: ${theme.typography.fontSizes.$3};
  color: ${theme.colors.darkGray};
  transition: 500ms all ease-in-out;
`;

const ListItem = styled.li`
  background-color: ${theme.colors.white};
  border: 2px solid ${theme.colors.lightGray};
  box-shadow: 0px 4px 24px rgba(225, 225, 225, 0.25);
  border-radius: 10px;
  padding: ${theme.spacing.$6};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.$4};
  width: calc(100% / 3 - 16px);
  transition: 500ms all ease-in-out;
  h1 {
    color: ${theme.colors.blackGray};
    font-size: ${theme.typography.fontSizes.$5};
    font-weight: ${theme.typography.fontWeights.medium};
  }
  &:hover {
    background-color: ${theme.colors.coolSurf};
    ${IconWrapper} {
      background-color: ${theme.colors.white};
      color: ${theme.colors.coolSurf};
    }
    h1 {
      color: ${theme.colors.white};
    }
    ${Link} {
      color: ${theme.colors.white};
    }
  }
  @media ${theme.device.tablet} {
    width: 100%;
  }
`;
