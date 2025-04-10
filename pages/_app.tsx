import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

import { Provider } from 'react-redux';
import { store } from '../store/store';

function App({ Component, pageProps }: AppProps) {

  //rafraîchissement de l'accessToken
  const refreshAccessToken = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:3000/auth/refresh", {
        method: "POST",
        credentials: "include", // envoie automatiquement le refreshToken du cookie httpOnly
      });

      const data = await response.json();

      if (data.token) {
        // On met à jour l'accessToken dans le store Redux
        localStorage.setItem("token", data.token);
      } else {
        console.log("Impossible de rafraîchir le token");
      }
    } catch (error) {
      console.error("Erreur lors du rafraîchissement du token :", error);
    }
  };

  // Rafraîchissement de l'accessToken lors du premier rendu de l'application
  useEffect(() => {
    refreshAccessToken();
  }, []); // Cette fonction sera appelée une fois, lors du premier rendu
  
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
