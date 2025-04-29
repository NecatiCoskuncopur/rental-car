import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { logoutSuccess } from '@/redux/userSlice';

const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'GET',
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
      } else {
        dispatch(logoutSuccess());
        router.push('/login');
      }
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error(errorMessage);
    }
  }, [dispatch, router]);

  return logout;
};

export default useLogout;
