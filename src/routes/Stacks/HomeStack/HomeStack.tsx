import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//Default
import Home from '@src/screens/Home';
import PlaceDetails from '@src/screens/PlaceDetails';
import PlaceList from '@src/screens/PlaceList';
import Checkout from '@src/routes/Stacks/CheckoutStack';
import styles from './styles';
import {ScreenNavigationProps} from '../types';
import {Button, Icon, SearchBar} from '@src/components/elements';

type HomeStackParamList = {
  HomeScreen: undefined;
  PlaceDetailsScreen: undefined;
  CheckoutScreen: undefined;
  PlaceListScreen: {
    title?: string;
  };
};
type HomeStackProps = {} & ScreenNavigationProps;

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack: React.FC<HomeStackProps> = ({navigation}) => {
  const _renderExploreHeaderTitle = () => {
    return (
      <SearchBar
        placeholder="Find places, dishes, restaurants..."
        rightIconName="options-outline"
      />
    );
  };

  const _renderExploreHeaderRight = () => {
    return (
      <Icon
        name="notifications"
        size={22}
        isPrimary
        useIonicons
        onPress={() => navigation.navigate('Notifications')}
      />
    );
  };

  const _renderPlaceDetailHeaderRight = () => {
    return (
      <Button
        isTransparent
        onPress={() => navigation.navigate('SearchDishesModal')}>
        <Icon name="md-search" size={22} isPrimary useIonicons />
      </Button>
    );
  };

  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        options={() => {
          return {
            headerTitle: _renderExploreHeaderTitle,
            headerTitleContainerStyle: styles.headerTitleContainer,
          };
        }}
        name="HomeScreen"
        component={Home}
      />
      <Stack.Screen
        options={() => {
          return {
            headerTitle: 'Neapolitan Pizza',
            headerRight: _renderPlaceDetailHeaderRight,
            headerRightContainerStyle: styles.headerRightContainer,
          };
        }}
        name="PlaceDetailsScreen"
        component={PlaceDetails}
      />
      <Stack.Screen
        options={({route: {params}}) => {
          return {
            headerTitle: params?.title || 'Places',
          };
        }}
        name="PlaceListScreen"
        component={PlaceList}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CheckoutScreen"
        component={Checkout}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
