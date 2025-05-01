import React from 'react';
import styled from 'styled-components';

import theme from '@/theme';

const ContactMap: React.FC = () => {
  return (
    <Wrapper>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.497190719492!2d-122.41941558468128!3d37.77492957975974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808581617e4a4b23%3A0xc1b0caa7ec9ef0a2!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1597227749275!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        aria-hidden="false"
        tabIndex={0}
      />
    </Wrapper>
  );
};

export default ContactMap;

const Wrapper = styled.div`
  width: 50%;
  min-height: 400px;
  @media ${theme.device.laptop} {
    width: 100%;
  }
`;
