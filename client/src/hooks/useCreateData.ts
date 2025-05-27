import { useState, useCallback } from 'react';

interface CreateState {
  loading: boolean;
  error: string | null;
}

const useCreateData = <U>(endpoint: string) => {
  const [state, setState] = useState<CreateState>({
    loading: false,
    error: null,
  });

  const createData = useCallback(
    async (payload: U) => {
      setState({ loading: true, error: null });

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Failed to create data');
        }

        setState({ loading: false, error: null });
      } catch (error) {
        setState({ loading: false, error: (error as Error).message });
      }
    },
    [endpoint]
  );

  return { ...state, createData };
};

export default useCreateData;
