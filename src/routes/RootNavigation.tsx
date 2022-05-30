import React, {useContext} from 'react';
import {Platform, InteractionManager, View, StatusBar} from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import TabNavigation from '@src/routes/TabNavigation';
import DishDetails from '@src/screens/DishDetails';
import SearchDishes from '@src/screens/SearchDishes';
import Acquire from '@src/screens/Acquire';
import AcquireAR from '@src/screens/AcquireAR';
import AuthenticationStack from '@src/routes/Stacks/AuthenticationStack';
import AuthContext from '@src/context/auth-context';
import {useTheme} from '@src/hooks';
import StatusNav from '@src/hooks/useStatusNav';

const RootStack = createStackNavigator();

const RootNavigation = () => {
  //Default
  const {colors, theme, navTheme} = useTheme();
  const {userToken} = useContext(AuthContext);
  const navigationRef = useNavigationContainerRef();
  const screenOptions =
    Platform.OS === 'ios'
      ? {
          ...TransitionPresets.SlideFromRightIOS,
        }
      : {
          ...TransitionPresets.ModalTransition,
        };

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navTheme}
      onStateChange={() => {
        const route = navigationRef.current?.getCurrentRoute();
        if (
          route?.name === 'AcquireARScreen' ||
          route?.name === 'AcquireScreen' ||
          route?.name === 'HomeScreen'
        ) {
          StatusNav.setScreenNav({
            routeName: route?.name,
            colors: colors,
            theme: theme,
          });
        }
      }}>
      <RootStack.Navigator screenOptions={screenOptions}>
        {userToken ? (
          <RootStack.Screen
            name="Main"
            options={{headerShown: false}}
            component={TabNavigation}
          />
        ) : (
          <RootStack.Screen
            options={{
              headerTransparent: true,
              headerStatusBarHeight: 0,
              title: '',
              headerBackTitleVisible: false,
            }}
            name="Auth"
            component={AuthenticationStack}
          />
        )}
        <RootStack.Screen
          options={{
            headerTransparent: true,
            title: '',
            headerBackTitleVisible: false,
          }}
          name="DishDetailsModal"
          component={DishDetails}
        />
        <RootStack.Screen
          options={{
            headerShown: false,
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({current: {progress}}) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            }),
          }}
          name="SearchDishesModal"
          component={SearchDishes}
        />
        <RootStack.Screen
          options={{
            headerShown: false,
            headerTransparent: true,
            headerLeft: () => null,
            headerBackTitleVisible: false,
          }}
          name="AcquireScreen"
          component={Acquire}
        />
        <RootStack.Screen
          options={{
            headerShown: false,
            headerTransparent: true,
            headerLeft: () => null,
            headerBackTitleVisible: false,
          }}
          name="AcquireARScreen"
          component={AcquireAR}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
