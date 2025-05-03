import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarDays } from 'react-icons/fa6';
import { FiTag } from 'react-icons/fi';

import theme from '@/theme';
import { formatDate } from '@/utils';
import ClampedText from '../ClampedText';

type TopArticle = {
  posts: IPost[];
};

const TopArticle: React.FC<TopArticle> = ({ posts }) => {
  const slicedPost = posts.slice(0, 3);

  return (
    <Wrapper>
      <TitleWrapper>
        <FiTag />
        <h2>Top Article</h2>
      </TitleWrapper>
      {slicedPost.map((post) => (
        <ContentWrapper key={post._id}>
          <Link href={`/blog/${post.slug}`}>
            <ImageWrapper>
              <Image
                src={post.image}
                alt={post.title}
                fill
                quality={100}
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </ImageWrapper>
            <TextWrapper>
              <ClampedText lineClamp={1}>
                <h1>{post.title}</h1>
              </ClampedText>
              <Date>
                <FaCalendarDays />
                <span>{formatDate(post.updatedAt)}</span>
              </Date>
            </TextWrapper>
          </Link>
        </ContentWrapper>
      ))}
    </Wrapper>
  );
};

export default TopArticle;

const Wrapper = styled.div`
  background: ${theme.colors.white};
  border-radius: 10px;
  padding: ${theme.spacing.$7};
`;

const ImageWrapper = styled.div`
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

const TitleWrapper = styled.div`
  padding-bottom: ${theme.spacing.$6};
  margin-bottom: ${theme.spacing.$7};
  border-bottom: 1px solid ${theme.colors.lightGray};
  color: ${theme.colors.extraDarkGray};
  font-weight: ${theme.typography.fontWeights.semiBold};
  display: flex;
  align-items: center;
  line-height: 1.2;
  gap: ${theme.spacing.$3};
  svg {
    color: ${theme.colors.warningOrange};
    font-size: ${theme.typography.fontSizes.$5};
  }
  h1 {
    font-size: ${theme.typography.fontSizes.$6};
  }
  h2 {
    font-size: ${theme.typography.fontSizes.$5};
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  min-height: 250px;
  border-radius: 10px;
  color: ${theme.colors.white};
  overflow: hidden;
  transition: 300ms all ease-in-out;
  &:not(:last-child) {
    margin-bottom: ${theme.spacing.$7};
  }
  &::before {
    content: '';
    position: absolute;
    background: linear-gradient(0deg, ${theme.colors.black} 16.31%, rgba(0, 0, 0, 0) 100%);
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  img {
    object-fit: cover;
    transition: 400ms all ease-in-out;
  }
  &:hover {
    color: ${theme.colors.warningOrange};
    img {
      transform: scale(1.04);
    }
  }
`;

const TextWrapper = styled.div`
  padding: ${theme.spacing.$6};
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

const Date = styled.p`
  font-size: ${theme.typography.fontSizes.$2};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.$3};
  margin-top: ${theme.spacing.$4};
  svg {
    color: ${theme.colors.warningOrange};
  }
`;
