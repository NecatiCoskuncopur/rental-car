import React from 'react';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import theme from '@/theme';
import { routeMeta } from '@/constants';

const Banner = () => {
  const pathname = usePathname();

  const meta = (routeMeta as Record<string, { title: string; breadcrumb: string[] }>)[pathname] || {
    title: 'Sayfa',
    breadcrumb: ['Anasayfa'],
  };

  const generateBreadcrumbPaths = () => {
    const pathParts = pathname.split('/').filter(Boolean);
    const paths = ['/'];
    for (let i = 0; i < pathParts.length; i++) {
      const segment = '/' + pathParts.slice(0, i + 1).join('/');
      paths.push(segment);
    }
    return paths;
  };

  const breadcrumbPaths = generateBreadcrumbPaths();

  return (
    <Container>
      <h1>{meta.title}</h1>
      <Nav>
        {meta.breadcrumb.map((label, index) => {
          const isLast = index === meta.breadcrumb.length - 1;
          const href = breadcrumbPaths[index];

          return (
            <React.Fragment key={index}>
              {isLast ? (
                <BreadcrumbItem as="span">{label}</BreadcrumbItem>
              ) : (
                <Link
                  href={href}
                  passHref
                  legacyBehavior
                >
                  <BreadcrumbItem as="a">{label}</BreadcrumbItem>
                </Link>
              )}
              {!isLast && <Slash>/</Slash>}
            </React.Fragment>
          );
        })}
      </Nav>
    </Container>
  );
};

export default Banner;

const Container = styled.section`
  background-color: ${theme.colors.extraDarkGray};
  padding: ${theme.spacing.$13} 0;
  color: ${theme.colors.white};
  h1 {
    margin-bottom: ${theme.spacing.$5};
    font-size: ${theme.typography.fontSizes.$9};
    font-weight: ${theme.typography.fontWeights.bold};
    text-align: center;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.$3};
  font-size: ${theme.typography.fontSizes.$3};
  color: ${theme.colors.white};
`;

const BreadcrumbItem = styled.div`
  cursor: pointer;
  &:last-child {
    color: ${theme.colors.yellow};
    cursor: default;
  }

  &:not(:last-child) {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Slash = styled.span`
  margin: 0 ${theme.spacing.$3};
  color: ${theme.colors.white};
  user-select: none;
`;
