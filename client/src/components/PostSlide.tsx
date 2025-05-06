import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import theme from '@/theme';
import { useFetchData } from '@/hooks';
import Container from './Container';
import PostCard from './Post/PostCard';
import OverlayLoader from './OverlayLoader';
import SectionHeading from './SectionHeading';

const PostSlide = () => {
  const { data: postsData, loading, error } = useFetchData<IPostData>('/api/post/getPosts');

  if (loading) return <OverlayLoader variant="card" />;
  if (error) return <p>Error loading posts</p>;

  return (
    <Wrapper>
      <Container>
        <SectionHeading
          title="News & Insights For You"
          subtitle="This blog post provides valuable insights into the benefits"
          variant="dark"
        />
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay]}
        >
          {postsData?.posts?.map((post) => (
            <SwiperSlide key={post._id}>
              <PostCard
                post={post}
                type="slide"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Wrapper>
  );
};

export default PostSlide;

const Wrapper = styled.div`
  background-color: ${theme.colors.bgLighter};
  position: relative;
`;
