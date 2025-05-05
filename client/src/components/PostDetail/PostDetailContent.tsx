import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import theme from '@/theme';

type PostDetailContentProps = {
  post: IPost;
};

const PostDetailContent: React.FC<PostDetailContentProps> = ({ post }) => {
  return (
    <>
      <ImageWrapper>
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority={true}
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={100}
        />
      </ImageWrapper>

      <Content dangerouslySetInnerHTML={{ __html: post.content }} />
    </>
  );
};

export default PostDetailContent;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  overflow: hidden;
  border-radius: 20px;
  image {
    object-fit: cover;
    border-radius: ${theme.borderRadius.xl};
  }
`;

const Content = styled.p`
  margin-top: ${theme.spacing.$6};
  color: ${theme.colors.darkGray};
  font-size: ${theme.typography.fontSizes.$3};
  ol {
    padding-left: 20px;
    li {
      margin-bottom: 5px;
      list-style-type: decimal;
    }
  }

  ul {
    padding-left: 20px;
    li {
      margin-bottom: 5px;
      list-style-type: disc;
    }
  }
`;
