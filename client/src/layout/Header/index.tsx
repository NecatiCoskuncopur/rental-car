import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';

import Hero from './Hero';
import Navbar from './Navbar';
import Banner from './Banner';

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [pathname]);

  return (
    <Wrapper ref={headerRef}>
      <Navbar headerHeight={headerHeight} />
      {isHomePage ? <Hero /> : <Banner />}
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  width: 100%;
  height: 100%;
`;
