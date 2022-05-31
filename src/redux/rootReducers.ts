import {combineReducers} from '@reduxjs/toolkit';
import {persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeSlice from './slices/themeSlice';
import artSlice from './slices/artSlice';
import portalSlice from './slices/portalSlice';
import cameraSlice from './slices/cameraSlice';
import renderSlice from './slices/renderSlice';

//Reducer
const reducers = {
  themeSlice,
  cameraSlice,
  artSlice,
  portalSlice,
  renderSlice,
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['themeSlice', 'cameraSlice'],
};

export const persistedRootReducer = persistCombineReducers(
  persistConfig,
  reducers,
);

export default persistedRootReducer;
