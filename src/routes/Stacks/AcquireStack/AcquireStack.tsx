import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AcquireDevice from '@src/screens/Acquire/Device';
import AcquireAR from '@src/screens/Acquire/Augmented';

type AcquireStackProps = {};
const Stack = createStackNavigator();

const AcquireStack: React.FC<AcquireStackProps> = () => {
  return (
    <Stack.Navigator
      initialRouteName="AcquireDevice"
      screenOptions={{
        detachPreviousScreen: true,
        headerShown: false,
        headerStatusBarHeight: 0,
      }}>
      <Stack.Screen
        options={() => {
          return {
            title: 'Device',
          };
        }}
        name="AcquireDevice"
        component={AcquireDevice}
      />
      <Stack.Screen
        options={() => {
          return {
            title: 'Augmented',
          };
        }}
        name="AcquireAR"
        component={AcquireAR}
      />
    </Stack.Navigator>
  );
};

export default AcquireStack;
function getHiddenRoutesForRoute(name: any) {
  throw new Error('Function not implemented.');
}
