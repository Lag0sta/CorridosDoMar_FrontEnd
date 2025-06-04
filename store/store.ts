import { configureStore } from '@reduxjs/toolkit';

import user from './reducers/user';
import search from './reducers/search';
import handleLinks from './reducers/handleLinks';
import handleMainText from './reducers/handleMainText';
import authToken from './reducers/auth';
import mySubmits from './reducers/mySubmits';
import editSubmit from './reducers/editSubmits';

// Typage du store
export const store = configureStore({
  reducer: { authToken, user, search, handleLinks, handleMainText, mySubmits, editSubmit },
});

// Définition du type RootState
export type RootState = ReturnType<typeof store.getState>;
// Définition du type AppDispatch (facultatif mais utile pour l'envoi d'actions)
export type AppDispatch = typeof store.dispatch;