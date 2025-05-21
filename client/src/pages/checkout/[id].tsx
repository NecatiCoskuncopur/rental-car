import styled from 'styled-components';
import { useRouter } from 'next/router';

import theme from '@/theme';
import { Container } from '@/components';
import { Footer, Header } from '@/layout';

const Checkout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { pickupDate, returnDate } = router.query;

  return (
    <FlexContainer>
      <FormWrapper>Form</FormWrapper>
      <Aside>Aside</Aside>
    </FlexContainer>
  );
};

Checkout.getLayout = (page: React.ReactElement) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);

export default Checkout;

const FlexContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.$7};
`;

const FormWrapper = styled.div`
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
