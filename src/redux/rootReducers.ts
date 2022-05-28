import {combineReducers} from '@reduxjs/toolkit';
import {persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from './slices/themeSlice';
import artSlice from './slices/artSlice';

//Reducer
const reducers = {
  theme,
  artSlice,
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme'],
};

export const persistedRootReducer = persistCombineReducers(
  persistConfig,
  reducers,
);

export default persistedRootReducer;
