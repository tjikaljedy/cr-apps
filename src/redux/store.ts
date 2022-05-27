import {configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootSaga from './rootSaga';
import {persistedRootReducer} from './rootReducers';

// Setup Middlewares
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (__DEV__ && !process.env.JEST_WORKER_ID) {
  const createDebugger = require('redux-flipper').default;
  const RNAsyncStorageFlipper = require('rn-async-storage-flipper').default;
  middleware.push(createDebugger());
  RNAsyncStorageFlipper(AsyncStorage as any);
}

const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);
export {store, persistor};
