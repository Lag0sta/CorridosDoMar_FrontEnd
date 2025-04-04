import { configureStore } from '@reduxjs/toolkit';

import user from './reducers/user';
import search from './reducers/search';
import submitLinks from './reducers/submitLinks';
import submitMainText from './reducers/submitMainText';

// Typage du store
export const store = configureStore({
  reducer: { user, search, submitLinks, submitMainText },
});

// Définition du type RootState
export type RootState = ReturnType<typeof store.getState>;
// Définition du type AppDispatch (facultatif mais utile pour l'envoi d'actions)
export type AppDispatch = typeof store.dispatch;