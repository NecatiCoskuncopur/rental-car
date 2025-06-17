import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Logo = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/adminDashboard');

  const imageUrl = process.env.NEXT_PUBLIC_LOGO_URL as string;

  return (
    <StyledLink
      href="/"
      isAdminPage={isAdminPage}
    >
      <Image
        src={imageUrl}
        alt="Logo"
        width={100}
        height={60}
        loading="eager"
        priority={true}
      />
    </StyledLink>
  );
};

export default Logo;

const StyledLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== 'isAdminPage',
})<{ isAdminPage: boolean }>`
  ${(props) =>
    props.isAdminPage &&
    css`
      width: 100%;
      display: flex;
      justify-content: center;
    `}
  img {
    margin-top: 10px;
  }
`;
