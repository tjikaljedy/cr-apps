/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppState} from 'react-native';
import {LogBox, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigation from '@src/routes/RootNavigation';
//Redux
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from '@src/redux/store';
//Defaults
import AuthProvider from '@src/components/common/AuthProvider/AuthProvider';
import CartProvider from '@src/components/common/CartProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppReviewConfig} from '@src/constants';
import PermitProvider from '@src/components/common/PermissionProvider/PermitProvider';

const {USES_UNTIL_SHOW} = AppReviewConfig;
//const persistor = persistStore(store);
LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const App = () => {
  //Default
  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(
    appState.current,
  );

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      console.log('>> 0' + appStateVisible);
    });
    return () => {
      console.log('>> 1' + appStateVisible);
      subscription.remove();
    };
  }, []);

  React.useEffect(() => {
    if (appStateVisible !== 'active') {
      return;
    }
    const handleGetUsesUntilShowAppReview = async () => {
      const usesUntilShowAppReview = await AsyncStorage.getItem(
        USES_UNTIL_SHOW,
      );
      if (!usesUntilShowAppReview) {
        AsyncStorage.setItem(USES_UNTIL_SHOW, '1');
        return;
      }
      const totalUses = parseInt(usesUntilShowAppReview, 10) + 1;
      AsyncStorage.setItem(USES_UNTIL_SHOW, totalUses.toString());
    };
    handleGetUsesUntilShowAppReview();
  }, [appStateVisible]);

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <AuthProvider>
            <PermitProvider>
              <CartProvider>
                <RootNavigation />
              </CartProvider>
            </PermitProvider>
          </AuthProvider>
        </SafeAreaProvider>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
