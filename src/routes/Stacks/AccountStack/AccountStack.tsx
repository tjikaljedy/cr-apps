import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from '@src/components/elements';
import Account from '@src/screens/Account';
import EditProfile from '@src/screens/EditProfile';
import OrderHistory from '@src/screens/OrderHistory';
import SavedAddresses from '@src/screens/SavedAddresses';
import AddAddress from '@src/screens/AddAddress';
import Settings from '@src/screens/Settings';
import SupportCenter from '@src/screens/SupportCenter';
import SelectLocationScreen from '@src/screens/SelectLocation';
import {ScreenNavigationProps} from '../types';
import styles from './styles';

type AccountStackProps = {} & ScreenNavigationProps;
const Stack = createStackNavigator();

const AccountStack: React.FC<AccountStackProps> = (props) => {
  const {navigation} = props;
  const _renderAddAddressHeaderRight = () => {
    return (
      <Icon
        name="map"
        size={18}
        isPrimary
        onPress={() => navigation.navigate('SelectLocationScreen')}
      />
    );
  };

  return (
    <Stack.Navigator initialRouteName="AccountScreen">
      <Stack.Screen
        options={() => {
          return {
            title: 'Account',
          };
        }}
        name="AccountScreen"
        component={Account}
      />
      <Stack.Screen
        options={() => {
          return {
            title: 'Edit Profile',
          };
        }}
        name="EditProfileScreen"
        component={EditProfile}
      />
      <Stack.Screen
        options={() => {
          return {
            title: 'Order History',
          };
        }}
        name="OrderHistoryScreen"
        component={OrderHistory}
      />
      <Stack.Screen
        name="SavedAddressesScreen"
        options={{
          headerTitle: 'Saved Address',
        }}
        component={SavedAddresses}
      />
      <Stack.Screen
        name="AddAddressScreen"
        options={{
          headerTitle: 'Add An Address',
          headerRight: _renderAddAddressHeaderRight,
          headerRightContainerStyle: styles.headerRightContainer,
        }}
        component={AddAddress}
      />
      <Stack.Screen
        name="SettingsScreen"
        options={{
          headerTitle: 'Settings',
        }}
        component={Settings}
      />
      <Stack.Screen
        name="SupportCenterScreen"
        options={{
          headerTitle: 'Support Center',
        }}
        component={SupportCenter}
      />
      <Stack.Screen
        name="SelectLocationScreen"
        options={{
          headerTitle: 'Select location',
        }}
        component={SelectLocationScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
