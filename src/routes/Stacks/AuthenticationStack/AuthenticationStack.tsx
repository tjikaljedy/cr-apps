import * as React from 'react';
import {SafeAreaView} from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import {createStackNavigator} from '@react-navigation/stack';
import Authentication from '@src/screens/Authentication';
import AuthWithPhoneNumber from '@src/screens/AuthWithPhoneNumber';
import AuthVerificationCode from '@src/screens/AuthVerificationCode';
import Login from '@src/screens/Login';
import ForgotPassword from '@src/screens/ForgotPassword';
import {useTheme} from '@src/hooks';
import StatusNav from '@src/hooks/useStatusNav';
type AuthenticationStackProps = {};
const Stack = createStackNavigator();

const AuthenticationStack: React.FC<AuthenticationStackProps> = () => {
  const {colors, theme} = useTheme();
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator
        initialRouteName="AuthenticationScreen"
        screenOptions={{
          headerShown: true,
          title: '',
          headerStatusBarHeight: StaticSafeAreaInsets.safeAreaInsetsTop,
          headerStyle: {backgroundColor: colors.background},
        }}
        screenListeners={({route, navigation}) => ({
          state: (e) => {
            StatusNav.setScreenNav({
              routeName: route?.name,
              colors: colors,
              theme: theme,
            });
          },
        })}>
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
    </SafeAreaView>
  );
};

export default AuthenticationStack;
