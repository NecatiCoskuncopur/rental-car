import React from 'react';
import styled from 'styled-components';
import { GetStaticPropsContext, GetStaticPaths } from 'next';

import theme from '@/theme';
import { Footer, Header } from '@/layout';
import { Container, PostDetailContent, ErrorScreen, PostDetailFooter, Share, TopArticle } from '@/components';

interface BlogDetailProps {
  post: IPost;
  posts: IPost[];
  adjacentPosts: {
    previousPost: IPost | null;
    nextPost: IPost | null;
  };
}

const BlogDetail = ({ post, posts, adjacentPosts }: BlogDetailProps) => {
  if (!post || !posts || !adjacentPosts) return <ErrorScreen />;

  return (
    <Container>
      <Wrapper>
        <ContentWrapper>
          <PostDetailContent post={post} />
          <Share />
          <PostDetailFooter
            previousPost={adjacentPosts.previousPost}
            nextPost={adjacentPosts.nextPost}
          />
        </ContentWrapper>
        <Aside>
          <TopArticle posts={posts} />
        </Aside>
      </Wrapper>
    </Container>
  );
};

BlogDetail.getLayout = (page: React.ReactElement) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);

export default BlogDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.API_URL}/api/post/getSlugs`);
  const slugs: string[] = await res.json();

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context.params?.slug;

  if (typeof slug !== 'string') return { notFound: true };

  try {
    const [postRes, postsRes, adjacentRes] = await Promise.all([
      fetch(`${process.env.API_URL}/api/post/getPost/${slug}`),
      fetch(`${process.env.API_URL}/api/post/getPosts`),
      fetch(`${process.env.API_URL}/api/post/getAdjacentPosts/${slug}`),
    ]);

    const post = await postRes.json();
    const postsData = await postsRes.json();
    const adjacentPosts = await adjacentRes.json();

    if (!post || postRes.status !== 200 || postsRes.status !== 200 || adjacentRes.status !== 200) {
      return { notFound: true };
    }

    return {
      props: {
        post,
        posts: postsData.posts || [],
        adjacentPosts: {
          previousPost: adjacentPosts?.previousPost || null,
          nextPost: adjacentPosts?.nextPost || null,
        },
      },
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.$7};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.$7};
  width: calc(66.66666666666667% - 12px);
  @media ${theme.device.laptop} {
    width: 100%;
  }
`;

const Aside = styled.aside`
  width: calc(33.33333333333333% - 12px);
  @media ${theme.device.laptop} {
    width: 100%;
  }
`;
