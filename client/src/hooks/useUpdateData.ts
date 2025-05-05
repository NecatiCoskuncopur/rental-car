import { useState, useCallback } from 'react';

interface UpdateState {
  loading: boolean;
  error: string | null;
}

const useUpdateData = <T>(endpoint: string) => {
  const [state, setState] = useState<UpdateState>({
    loading: false,
    error: null,
  });

  const updateData = useCallback(
    async (payload: Partial<T>) => {
      setState({ loading: true, error: null });

      try {
        const response = await fetch(endpoint, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Failed to update data');
        }

        setState({ loading: false, error: null });
      } catch (error) {
        setState({ loading: false, error: (error as Error).message });
      }
    },
    [endpoint]
  );

  return { ...state, update: updateData };
};

export default useUpdateData;
