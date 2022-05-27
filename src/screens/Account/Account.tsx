import * as React from 'react';
import {
  Container,
  Icon,
  Divider,
  SearchBar,
  Button,
  Text,
} from '@src/components/elements';
import {
  ScrollView,
  Image,
  View,
  Alert,
  AlertButton,
  I18nManager,
} from 'react-native';
import ListRowItem from '@src/components/elements/List/ListRowItem';
import {profile} from '@src/data/mock-profile';
import styles from './styles';
import {useTheme} from '@src/hooks';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '@src/context/auth-context';

type AccountProps = {};

const Account: React.FC<AccountProps> = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {signOut} = React.useContext(AuthContext);
  const chevronIconName = I18nManager.isRTL ? 'chevron-left' : 'chevron-right';

  const alertButtons: AlertButton[] = [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {text: 'OK', onPress: () => signOut()},
  ];

  const onLogoutButtonPressed = () => {
    Alert.alert('Confirm', 'Are you sure you want to logout?', alertButtons);
  };

  return (
    <ScrollView>
      <SearchBar />
      <Divider />
      <Container>
        <ListRowItem
          title={profile.name}
          titleColor={colors.text}
          subTitle="Edit Profile"
          subTitleColor={colors.primary}
          onPress={() => navigation.navigate('EditProfileScreen' as any)}
          leftIcon={
            <Image source={profile.avatar} style={styles.profileAvatar} />
          }
          rightIcon={<Icon name={chevronIconName} />}
        />
      </Container>
      <Container style={styles.accountMenuItemContainer}>
        <Divider />
        <Divider />
        <ListRowItem
          title="Order History"
          titleColor={colors.text}
          onPress={() => navigation.navigate('OrderHistoryScreen' as any)}
          rightIcon={<Icon name={chevronIconName} />}
        />
        <Divider />
        <ListRowItem
          title="Delivery Address"
          titleColor={colors.text}
          onPress={() => navigation.navigate('SavedAddressesScreen' as any)}
          rightIcon={<Icon name={chevronIconName} />}
        />
        <Divider />
        <ListRowItem
          title="Settings"
          titleColor={colors.text}
          onPress={() => navigation.navigate('SettingsScreen' as any)}
          rightIcon={<Icon name={chevronIconName} />}
        />
        <Divider />

        <ListRowItem
          title="Support Center"
          titleColor={colors.text}
          onPress={() => navigation.navigate('SupportCenterScreen' as any)}
          rightIcon={<Icon name={chevronIconName} />}
        />
        <Divider />
        <ListRowItem
          title="Share Feedback"
          titleColor={colors.text}
          rightIcon={<Icon name={chevronIconName} />}
        />
      </Container>
      <View style={styles.buttonContainer}>
        <Button isFullWidth isTransparent onPress={onLogoutButtonPressed}>
          <Text isBold isPrimary>
            Logout
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default Account;
