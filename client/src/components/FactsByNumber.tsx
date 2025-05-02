import React from 'react';
import styled from 'styled-components';

import theme from '@/theme';
import { factsData } from '@/data';
import Container from './Container';
import SectionHeading from './SectionHeading';

const FactsByNumber = () => {
  return (
    <Wrapper>
      <Container>
        <SectionHeading
          title="Facts By The Number"
          subtitle="Discover impressive facts and figures about our rent-a-car services at a glance!"
          variant="light"
        />

        <List>
          {factsData.map((item, index) => (
            <ListItem key={index}>
              <IconWrapper>{item.icon}</IconWrapper>
              <div>
                <h1>{item.count}</h1>
                <p>{item.title}</p>
              </div>
            </ListItem>
          ))}
        </List>
      </Container>
    </Wrapper>
  );
};

export default FactsByNumber;

const Wrapper = styled.div`
  background-color: ${theme.colors.extraDarkGray};
  text-align: center;
  h1 {
    font-size: ${theme.typography.fontSizes.$7};
    font-weight: ${theme.typography.fontWeights.bold};
  }
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.$7};
  flex-wrap: wrap;
`;

const IconWrapper = styled.div`
  padding: ${theme.spacing.$7};
  background-color: ${theme.colors.extraDarkGray};
  color: ${theme.colors.white};
  border-radius: 10px;
  display: flex;
  align-items: center;
  transition: 500ms all ease-in-out;
`;

const ListItem = styled.li`
  width: calc(25% - 18px);
  padding: ${theme.spacing.$6};
  border-radius: 10px;
  background-image: url(/images/factsBg.jpg);
  background-repeat: no-repeat;
  background-position: right;
  background-size: cover;
  display: flex;
  align-items: center;
  text-align: left;
  gap: ${theme.spacing.$6};
  user-select: none;
  transition: 500ms all ease-in-out;
  &:hover {
    transform: translateY(-16px);
    ${IconWrapper} {
      background-color: ${theme.colors.coolSurf};
    }
  }
  p {
    color: ${theme.colors.darkGray};
  }
  @media ${theme.device.desktop} {
    width: calc(50% - 12px);
  }
  @media ${theme.device.tablet} {
    width: 100%;
  }
`;
