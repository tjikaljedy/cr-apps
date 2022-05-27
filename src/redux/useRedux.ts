import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {store} from './store';
import persistedRootReducer from './rootReducers';

export type RootState = ReturnType<typeof persistedRootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
