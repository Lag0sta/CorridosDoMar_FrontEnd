import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './store'; // import du type RootState

// Création du hook useAppSelector avec le type RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;