import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import theme from '@/theme';
import { shareData } from '@/data';

const ShareToPlatform: React.FC = () => {
  return (
    <Container>
      <SwiperWrapper>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={3}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {shareData.map((item) => (
            <SwiperSlide key={item.key}>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                background={item.bg}
              >
                {item.icon}
              </Link>
              <p>{item.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
        <Button className="swiper-button-prev" />
        <Button className="swiper-button-next" />
      </SwiperWrapper>
    </Container>
  );
};

export default ShareToPlatform;

const Container = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: ${theme.spacing.$6};
`;

const SwiperWrapper = styled.div`
  position: relative;
  .swiper-slide {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.$3};
    flex-direction: column;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 40%;
  z-index: 10;
  background-color: ${theme.colors.almostBlack};
  color: ${theme.colors.white};
  border: none;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow:
    0 4px 4px rgba(0, 0, 0, 0.3),
    0 0 4px rgba(0, 0, 0, 0.2);
  &.swiper-button-prev {
    left: -24px;
    &::after {
      font-size: ${theme.spacing.$4};
    }
  }
  &.swiper-button-next {
    right: -10px;
    &::after {
      font-size: ${theme.spacing.$4};
    }
  }
`;

const Link = styled.a<{ background: string }>`
  color: ${theme.colors.white};
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSizes.$6};
  border-radius: 50%;
  background-color: ${(props) => props.background};
  cursor: pointer;
`;
