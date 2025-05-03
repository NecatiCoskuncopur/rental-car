import { useEffect, useState } from 'react';
import styled from 'styled-components';

import theme from '@/theme';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const updateProgress = () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    setScrollProgress(progress);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('scroll', updateProgress);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <ButtonContainer>
      {isVisible && (
        <ProgressButton onClick={scrollToTop}>
          <ArrowIcon viewBox="0 0 384 512">
            <path d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z" />
          </ArrowIcon>
          <ProgressSvg viewBox="0 0 100 100">
            <TrackCircle
              cx="50"
              cy="50"
              r="48"
            />

            <ProgressCircle
              cx="50"
              cy="50"
              r="48"
              progress={scrollProgress}
            />
          </ProgressSvg>
        </ProgressButton>
      )}
    </ButtonContainer>
  );
};

export default ScrollToTop;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
`;

const ProgressButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0;
  transition: transform 0.2s ease;
  box-shadow:
    0 2px 5px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(0, 0, 0, 0.05);
  &:hover {
    transform: scale(1.1);
  }
`;

const ProgressSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

const TrackCircle = styled.circle`
  fill: transparent;
  stroke: ${theme.colors.gray};
  stroke-width: 2;
  stroke-dasharray: 302;
  stroke-dashoffset: 0;
`;

const ProgressCircle = styled.circle.withConfig({ shouldForwardProp: (props) => props !== 'progress' })<{ progress: number }>`
  fill: transparent;
  stroke: ${theme.colors.yellow};
  stroke-width: 2;
  stroke-dasharray: 302;
  stroke-dashoffset: ${({ progress }) => 302 - (302 * progress) / 100};
  transition: stroke-dashoffset 0.2s ease;
`;

const ArrowIcon = styled.svg`
  width: 16px;
  height: 16px;
  z-index: 1;
  fill: ${theme.colors.yellow};
`;
