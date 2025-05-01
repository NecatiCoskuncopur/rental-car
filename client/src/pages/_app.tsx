import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { usePathname } from 'next/navigation';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Loader } from '@/components';
import { routeMeta } from '@/constants';
import GlobalStyles from '@/GlobalStyles';
import { persistor, store } from '@/redux/store';

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page);

  const pathname = usePathname();
  const routeTitle = routeMeta[pathname]?.title;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalStyles />
        {getLayout(
          <>
            <Head>
              <title>{routeTitle ? `Rental Car - ${routeTitle}` : 'Rental Car'}</title>
            </Head>
            <Loader />
            <Component {...pageProps} />
          </>
        )}
      </PersistGate>
    </Provider>
  );
}
