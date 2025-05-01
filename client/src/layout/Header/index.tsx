import React from 'react';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';

import Hero from './Hero';
import Navbar from './Navbar';
import Banner from './Banner';

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <Wrapper>
      <Navbar />
      {isHomePage ? <Hero /> : <Banner />}
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  width: 100%;
  height: 100%;
`;
