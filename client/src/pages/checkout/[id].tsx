import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Form } from 'antd';
import { toast } from 'react-toastify';

import theme from '@/theme';
import { RootState } from '@/redux/store';
import { Footer, Header } from '@/layout';
import { CheckoutForm, Container, OrderDetail, OverlayLoader } from '@/components';

const Checkout = () => {
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { pickupDate, returnDate, id } = router.query;
  const [form] = Form.useForm();
  const formRef = useRef(form);
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

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        name: currentUser.name,
        surname: currentUser.surname,
        email: currentUser.email,
      });
    }
  }, [currentUser, form]);

  if (loading) return <OverlayLoader variant="rightAside" />;

  return (
    <Form
      form={form}
      name="checkout"
      initialValues={{ remember: true }}
      layout="vertical"
      ref={formRef}
      onFinish={handleFinish}
      autoComplete="off"
    >
      <FlexContainer>
        <FormWrapper>
          <CheckoutForm formRef={formRef} />
        </FormWrapper>
        <Aside>
          <OrderDetail
            pickupDate={pickupDate}
            returnDate={returnDate}
            vehicle={vehicle}
          />
        </Aside>
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
