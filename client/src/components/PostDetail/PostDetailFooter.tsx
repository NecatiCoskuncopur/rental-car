import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

import theme from '@/theme';

type FooterProps = {
  previousPost: IPost | null;
  nextPost: IPost | null;
};

const PostDetailFooter: React.FC<FooterProps> = ({ previousPost, nextPost }) => {
  const router = useRouter();

  return (
    <Container>
      <NavigationButton
        onClick={() => router.push(`/blog/${previousPost?.slug}`)}
        disabled={!previousPost}
      >
        <FaArrowLeft />
        <span>Previous Post</span>
      </NavigationButton>
      <NavigationButton
        disabled={!nextPost}
        onClick={() => router.push(`/blog/${nextPost?.slug}`)}
      >
        <span> Next Post</span>
        <FaArrowRight />
      </NavigationButton>
    </Container>
  );
};

export default PostDetailFooter;

const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const NavigationButton = styled.button`
  color: ${theme.colors.coolSurf};
  font-size: ${theme.typography.fontSizes.$2};
  background-color: unset;
  cursor: pointer;
  font-size: ${theme.typography.fontSizes.$2};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.$3};
  transition: 300ms all ease-in-out;
  &:hover {
    color: ${theme.colors.warningOrange};
  }
  &:disabled {
    color: ${theme.colors.gray};
    cursor: not-allowed;
  }
`;
