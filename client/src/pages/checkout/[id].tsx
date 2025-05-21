import styled from 'styled-components';
import { useRouter } from 'next/router';

import theme from '@/theme';
import { Container, OverlayLoader } from '@/components';
import { Footer, Header } from '@/layout';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { pickupDate, returnDate, id } = router.query;
  const [form] = Form.useForm();
  const [vehicle, setVehicle] = useState<IVehicle | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/vehicle/getVehicle/${id}`);
        const data = await res.json();
        setVehicle(data);
      } catch (error) {
        toast.error('Failed to fetch vehicle data.');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleFinish = async () => {
    try {
      const bookingData = {
        userId: currentUser?._id,
        vehicleId: vehicle?._id,
        startDate: pickupDate,
        endDate: returnDate,
      };

      const res = await fetch('/api/booking/createBooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      toast.success('Booking successfully created');
      router.push('/userBookings');
    } catch (error) {
      toast.error(`Error creating booking: ${error}`);
    }
  };

  if (loading) return <OverlayLoader variant="rightAside" />;

  return (
    <Form
      form={form}
      name="checkout"
      initialValues={{ remember: true }}
      layout="vertical"
      onFinish={handleFinish}
      autoComplete="off"
    >
      <FlexContainer>
        <FormWrapper>form</FormWrapper>
        <Aside>Aside</Aside>
      </FlexContainer>
    </Form>
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
