import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import theme from '@/theme';
import { useFetchData } from '@/hooks';
import { Footer, Header } from '@/layout';
import { Container, ErrorScreen, OverlayLoader, Paginate, PaginateNextButton, PaginatePrevButton, PostCard, TopArticle } from '@/components';

const Blog = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(parseInt(router.query.page as string, 10) || 1);
  const [pageSize] = useState(6);

  const { data: postsData, loading, error } = useFetchData<IPostData>(`/api/post/getPosts?limit=${pageSize}&page=${currentPage}`);

  const totalPosts = postsData?.totalPosts ?? 0;
  const totalPages = Math.ceil(totalPosts / pageSize);

  useEffect(() => {
    if (router.query.page) {
      setCurrentPage(parseInt(router.query.page as string, 10));
    }
  }, [router.query.page]);

  const handlePageClick = (data: { selected: number }) => {
    const selectedPage = data.selected + 1;
    router.push(`/blog?page=${selectedPage}`);
  };

  if (error) return <ErrorScreen />;

  return (
    <Container>
      {loading ? (
        <OverlayLoader variant="rightAside" />
      ) : (
        <>
          <Wrapper>
            <List>
              {postsData?.posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  type="grid"
                />
              ))}
            </List>
            <Aside>
              <TopArticle posts={postsData?.posts || []} />
            </Aside>
          </Wrapper>
          {totalPages > 1 && (
            <Paginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              previousLabel={<PaginatePrevButton />}
              nextLabel={<PaginateNextButton />}
              activeClassName={'selected'}
              disableInitialCallback={true}
              forcePage={currentPage - 1}
            />
          )}
        </>
      )}
    </Container>
  );
};

Blog.getLayout = (page: React.ReactElement) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);

export default Blog;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.$7};
`;

const List = styled.ul`
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
