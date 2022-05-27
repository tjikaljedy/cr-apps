import {combineReducers} from '@reduxjs/toolkit';
import {persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from './slices/themeSlice';
import storiesAR from './slices/storiesARSlice';

//Reducer
const reducers = {
  theme,
  storiesAR,
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
