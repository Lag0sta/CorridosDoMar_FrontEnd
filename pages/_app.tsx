import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

import { Provider } from 'react-redux';
import { store } from '../store/store';

function App({ Component, pageProps }: AppProps) {
  
  return (
    // Le Provider enveloppe toute l'application, ce qui permet d'utiliser Redux dans les composants.
    <Provider store={store}>
      <Head>
        <title>Next.js App</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
