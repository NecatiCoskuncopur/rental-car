import { useState } from 'react';

interface DeleteState {
  success: boolean;
  loading: boolean;
  error: string | null;
}

const useDeleteData = (endpoint: string) => {
  const [state, setState] = useState<DeleteState>({
    success: false,
    loading: false,
    error: null,
  });

  const deleteItem = async (): Promise<boolean> => {
    setState({ success: false, loading: true, error: null });

    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete data');
      }

      setState({ success: true, loading: false, error: null });
      return true;
    } catch (error) {
      setState({ success: false, loading: false, error: (error as Error).message });
      return false;
    }
  };

  return { state, deleteItem };
};

export default useDeleteData;
