import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';

import GlobalStyles from '@/GlobalStyles';
import { persistor, store } from '@/redux/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalStyles />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
