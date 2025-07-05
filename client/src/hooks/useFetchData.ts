import { useEffect, useState, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetchData = <T>(endpoint: string | null) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!endpoint) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    setState({ data: null, loading: true, error: null });

    try {
      const response = await fetch(`https://rental-car-7mor.onrender.com` + endpoint);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result: T = await response.json();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: (error as Error).message });
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
};

export default useFetchData;
