import '../styles/globals.css';
import Head from 'next/head';

//contient les Props nécéssaire pour nextApp
import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';

import { store } from '../store/store'



function App({ Component, pageProps } : AppProps) {
  return (
    <Provider store={store}>

      <Head>
        <title>Next.js App</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
