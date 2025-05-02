import React from 'react';
import styled from 'styled-components';

import theme from '@/theme';
import { whyChooseUsData } from '@/data';
import SectionHeading from './SectionHeading';
import Container from './Container';

const WhyChooseUs = () => {
  return (
    <Container>
      <SectionHeading
        title="Why Choose Us"
        subtitle="Explore the key reasons why our rent-a-car service is the perfect choice for you!"
        variant="dark"
      />

      <List>
        {whyChooseUsData.map((item, index) => (
          <ListItem key={index}>
            <IconWrapper bg={item.iconBg}>{item.icon}</IconWrapper>
            <h1>{item.title}</h1>
            <p>{item.text}</p>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default WhyChooseUs;

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.$7};
  flex-wrap: wrap;
`;

const IconWrapper = styled.div.withConfig({ shouldForwardProp: (props) => props !== 'bg' })<{ bg: string }>`
  color: ${theme.colors.white};
  background-color: ${(props) => props.bg};
  padding: ${theme.spacing.$6};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: ${theme.spacing.$6};
  transition: 500ms all ease-in-out;
`;

const ListItem = styled.li`
  padding: ${theme.spacing.$7};
  background-color: ${theme.colors.white};
  box-shadow: 0px 4px 24px 0px rgba(225, 225, 225, 0.25);
  border-radius: 10px;
  width: calc(100% / 3 - 16px);
  text-align: center;
  min-height: 295px;
  h1 {
    color: ${theme.colors.blackGray};
    margin-bottom: ${theme.spacing.$6};
    font-size: ${theme.typography.fontSizes.$6};
    font-weight: ${theme.typography.fontWeights.semiBold};
  }
  p {
    color: ${theme.colors.darkGray};
  }
  transition: 500ms all ease-in-out;
  &:hover {
    background-color: ${theme.colors.black};
    h1,
    p {
      color: ${theme.colors.white};
    }
    ${IconWrapper} {
      background-image: url(/images/factsBg.jpg);
      background-repeat: no-repeat;
      background-position: right;
      background-size: cover;
      color: ${theme.colors.black};
    }
  }
  @media ${theme.device.laptop} {
    width: 100%;
  }
`;
