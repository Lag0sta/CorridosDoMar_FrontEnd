import '../styles/globals.css';
import Head from 'next/head';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import user from '../reducers/user';
import search from '../reducers/search';
import submitLinks from '../reducers/submitLinks';
import submitMainText from '../reducers/submitMainText';

const store = configureStore({
 reducer: {user, search, submitLinks, submitMainText},
});

function App({ Component, pageProps }) {
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
