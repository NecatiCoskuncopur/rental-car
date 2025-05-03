import React from 'react';
import { Card, Skeleton } from 'antd';

import { Aside, Content, StyledCard, Wrapper } from './styles';

const LeftAsideLayout = () => {
  return (
    <Wrapper>
      <Aside>
        <Card>
          <Skeleton
            active
            paragraph={{ rows: 6 }}
          />
        </Card>
      </Aside>
      <Content>
        {Array.from({ length: 6 }).map((_, index) => (
          <StyledCard key={index}>
            <Skeleton
              active
              paragraph={{ rows: 3 }}
            />
          </StyledCard>
        ))}
      </Content>
    </Wrapper>
  );
};

export default LeftAsideLayout;
