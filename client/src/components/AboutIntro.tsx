import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import theme from '@/theme';
import Container from './Container';

const AboutIntro = () => {
  const mockImage = 'https://dreamsrent-wp.dreamstechnologies.com/wp-content/uploads/2023/12/about-us.png';

  return (
    <FlexContainer>
      <LeftSide>
        <Cover>
          <span>5+ years of experiences</span>
        </Cover>
        <ImageWrapper>
          <Image
            src={mockImage}
            alt="aboutUs"
            width={1200}
            height={600}
            priority={true}
            style={{
              objectFit: 'contain',
              width: '100%',
              height: 'auto',
            }}
          />
        </ImageWrapper>
      </LeftSide>
      <RightSide>
        <h6>About Our Company</h6>
        <h1>Best Solution for Your Travel Needs</h1>
        <p>
          Welcome to Rental Car, where your journey begins with ease, comfort, and reliability. As a premier car rental service, we take pride in offering a
          diverse fleet of vehicles tailored to meet your needs, whether you’re traveling for business, leisure, or an adventure. With a commitment to
          exceptional service and transparent pricing, we aim to make every ride a seamless and enjoyable experience.
        </p>
        <p>
          At Rental Car, we understand that every journey is unique. That’s why our dedicated team is here to assist you in selecting the perfect car that
          matches your style and requirements. From compact cars for city commutes to spacious SUVs for family road trips, our fleet is well-maintained and
          equipped with the latest features to ensure your safety and comfort.
        </p>
        <p>
          Driven by a passion for excellence, we go beyond just providing cars—we create connections, build trust, and help you explore the world without
          limits. With convenient pick-up and drop-off options, flexible rental plans, and 24/7 customer support, we’re here to make your travel dreams a
          reality. Choose Rental Car for your next journey and experience the road like never before.
        </p>
      </RightSide>
    </FlexContainer>
  );
};

export default AboutIntro;

const FlexContainer = styled(Container)`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: ${theme.spacing.$7};
`;

const LeftSide = styled.div`
  width: calc(50% - 12px);
  position: relative;
  @media ${theme.device.laptop} {
    width: 100%;
  }
`;

const Cover = styled.div`
  background-color: ${theme.colors.warningOrange};
  border-radius: 10px;
  width: 370px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  span {
    font-size: ${theme.typography.fontSizes.$7};
    margin: 250px -120px;
    color: ${theme.colors.white};
    display: inline-block;
    font-weight: ${theme.typography.fontWeights.medium};
    transform: rotate(-90deg);
  }
  @media ${theme.device.tablet} {
    width: 230px;
    span {
      font-size: ${theme.typography.fontSizes.$4};
      margin: 275px -90px;
    }
  }
  @media ${theme.device.mobile} {
    span {
      font-size: ${theme.typography.fontSizes.$3};
      margin: 115px -75px;
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  padding: ${theme.spacing.$9} 0 ${theme.spacing.$9} ${theme.spacing.$13};
  z-index: 1;
  img {
    border-radius: 10px;
    max-width: 100%;
    height: auto;
    padding-left: ${theme.spacing.$3};
  }
`;

const RightSide = styled.div`
  width: calc(50% - 12px);
  h6 {
    font-weight: ${theme.typography.fontWeights.medium};
    color: ${theme.colors.coolSurf};
    margin-bottom: ${theme.spacing.$4};
    line-height: 1.2;
    font-size: ${theme.typography.fontSizes.$4};
  }
  h1 {
    font-size: ${theme.typography.fontSizes.$9};
    font-weight: ${theme.typography.fontWeights.medium};
    margin-bottom: ${theme.spacing.$7};
    color: ${theme.colors.blackGray};
  }
  p {
    color: ${theme.colors.darkGray};
    margin-bottom: ${theme.spacing.$4};
  }

  @media ${theme.device.laptop} {
    width: 100%;
  }
`;
