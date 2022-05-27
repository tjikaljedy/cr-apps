import * as React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import NavProvider from '@src/components/common/NavProvider/NavProvider';
import Authentication from '@src/screens/Authentication';
import AuthWithPhoneNumber from '@src/screens/AuthWithPhoneNumber';
import AuthVerificationCode from '@src/screens/AuthVerificationCode';
import Login from '@src/screens/Login';
import ForgotPassword from '@src/screens/ForgotPassword';
import {useTheme} from '@src/hooks';

type AuthenticationStackProps = {};
const Stack = createStackNavigator();

const AuthenticationStack: React.FC<AuthenticationStackProps> = () => {
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();
  return (
    <>
      <NavProvider
        params={{
          overwrite: false,
          statusColor: colors.primary,
          navColor: colors.card,
        }}
      />
      <Stack.Navigator
        initialRouteName="AuthenticationScreen"
        screenOptions={{
          headerShown: true,
          title: '',
          headerStatusBarHeight: insets.top,
          headerStyle: {backgroundColor: colors.background},
        }}>
        <Stack.Screen
          name="AuthenticationScreen"
          component={Authentication}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AuthWithPhoneNumberScreen"
          component={AuthWithPhoneNumber}
        />
        <Stack.Screen
          name="AuthVerificationCodeScreen"
          component={AuthVerificationCode}
        />
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />
      </Stack.Navigator>
    </>
  );
};

export default AuthenticationStack;
