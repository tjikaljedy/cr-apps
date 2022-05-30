import {combineReducers} from '@reduxjs/toolkit';
import {persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from './slices/themeSlice';
import artSlice from './slices/artSlice';
import portalSlice from './slices/portalSlice';
import camera from './slices/cameraSlice';

//Reducer
const reducers = {
  theme,
  camera,
  artSlice,
  portalSlice,
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'camera'],
};

export const persistedRootReducer = persistCombineReducers(
  persistConfig,
  reducers,
);

export default persistedRootReducer;
