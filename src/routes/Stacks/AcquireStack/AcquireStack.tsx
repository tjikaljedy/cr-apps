import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AcquireDevice from '@src/screens/Acquire/Device';
import AcquireAR from '@src/screens/Acquire/Augmented';
import {ScreenNavigationProps} from '../types';

type AcquireStackProps = {} & ScreenNavigationProps;
const Stack = createStackNavigator();

const AcquireStack: React.FC<AcquireStackProps> = () => {
  return (
    <Stack.Navigator
      initialRouteName="AcquireDevice"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AcquireDevice" component={AcquireDevice} />
      <Stack.Screen name="AcquireAR" component={AcquireAR} />
    </Stack.Navigator>
  );
};

export default AcquireStack;
