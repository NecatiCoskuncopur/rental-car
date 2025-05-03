import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

import Button from '../Button';
import theme from '@/theme';
import ClampedText from '../ClampedText';

type PostCardProps = {
  post: IPost;
  type: 'slide' | 'grid';
};

const PostCard: React.FC<PostCardProps> = ({ post, type }) => {
  return (
    <Wrapper type={type}>
      <Link
        href={`/blog/${post.slug}`}
        passHref
      >
        <StyledImageWrapper>
          <Image
            src={post.image}
            alt={post.title}
            fill
            quality={100}
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </StyledImageWrapper>
      </Link>
      <Content>
        <Link href={`/blog/${post.slug}`}>
          <ClampedText lineClamp={2}>
            <h1>{post.title}</h1>
          </ClampedText>
        </Link>
        <span>
          <ClampedText
            lineClamp={2}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </span>
        <Link href={`/blog/${post.slug}`}>
          <Button
            colorVariant="light"
            hasIcon={true}
            size="spacious"
          >
            <div>Read More</div>
            <FiArrowRight />
          </Button>
        </Link>
      </Content>
    </Wrapper>
  );
};

export default PostCard;

const Wrapper = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== 'type',
})<{ type: 'slide' | 'grid' }>`
  width: ${(props) => (props.type === 'slide' ? '100%' : 'calc(50% - 12px)')};
  @media ${theme.device.tablet} {
    width: 100%;
  }
`;

const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 250px;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  cursor: pointer;
  transition: 400ms all ease-in-out;
  &:hover {
    img {
      transform: scale(1.02);
    }
  }
  img {
    object-fit: cover;
  }
`;

const Content = styled.div`
  padding: ${theme.spacing.$6};
  border: 1px solid ${theme.colors.bgMedium};
  border-radius: 0 0 10px 10px;
  h1 {
    color: ${theme.colors.extraDarkGray};
    margin-bottom: ${theme.spacing.$6};
    font-size: ${theme.typography.fontSizes.$6};
    font-weight: ${theme.typography.fontWeights.bold};
    transition: 200ms all ease-in-out;
    cursor: pointer;
    &:hover {
      color: ${theme.colors.coolSurf};
    }
  }
  span {
    color: ${theme.colors.darkGray};
    margin-bottom: ${theme.spacing.$7};
    display: block;
  }
`;
