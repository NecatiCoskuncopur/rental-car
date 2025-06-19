import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

import theme from '@/theme';
import { routeMeta } from '@/constants';

const Banner = () => {
  const router = useRouter();
  const { asPath } = router;

  const meta = routeMeta[router.pathname] || {
    title: 'Page',
    breadcrumb: ['Home', 'Page'],
  };

  const generateBreadcrumbPaths = () => {
    if (!asPath) return [];
    const pathParts = asPath.split('/').filter(Boolean);
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
          const href = breadcrumbPaths[index] || '/';

          return (
            <React.Fragment key={index}>
              {isLast ? (
                <CurrentBreadcrumb>{label}</CurrentBreadcrumb>
              ) : (
                <BreadcrumbLink
                  href={href}
                  passHref
                >
                  {label}
                </BreadcrumbLink>
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

// Styled Components
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

const BreadcrumbLink = styled(Link)`
  cursor: pointer;
  color: ${theme.colors.white};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const CurrentBreadcrumb = styled.span`
  cursor: default;
  color: ${theme.colors.yellow};
`;

const Slash = styled.span`
  margin: 0 ${theme.spacing.$3};
  color: ${theme.colors.white};
  user-select: none;
`;
