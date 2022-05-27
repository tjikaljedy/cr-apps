import * as React from 'react';
import {View, Image} from 'react-native';
import {Container, Text, Button} from '@src/components/elements';
import AuthContext from '@src/context/auth-context';
import PermissionContext from '@src/context/permission-context';
import {useTheme} from '@src/hooks';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

type AuthenticationProps = {};
const Authentication: React.FC<AuthenticationProps> = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {signIn} = React.useContext(AuthContext);
  const {check} = React.useContext(PermissionContext);

  const _onConnectWithPhoneNumberButtonPressed = () => {
    navigation.navigate('AuthWithPhoneNumberScreen' as any);
  };
  const _onSocialNetworkConnectButtonPressed = () => {
    signIn();
    check();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primary,
        },
      ]}>
      <View style={styles.appIconContainer}>
        <Image
          source={require('@src/assets/app/app_icon.png')}
          style={styles.appIcon}
        />
      </View>
      <Container style={styles.loginMethodContainer}>
        <Text isBold isHeadingTitle>
          Welcome to CrazyRich
        </Text>
        <Text
          isSecondary
          style={[styles.introductionText, {color: colors.text}]}>
          Boosting your creativity ability. where SME’s owner and Creator can
          supercharge their brands through CrazyRich platform
        </Text>
        <View style={styles.loginMethod}>
          <Button
            style={styles.button}
            isFullWidth
            onPress={_onConnectWithPhoneNumberButtonPressed}>
            <Text isBold isWhite>
              Connect with Phone Number
            </Text>
          </Button>
          <Button
            style={styles.button}
            backgroundColor="#4267b2"
            isFullWidth
            onPress={_onSocialNetworkConnectButtonPressed}>
            <Text isBold isWhite>
              Connect with Facebook
            </Text>
          </Button>
          <Button
            style={styles.button}
            backgroundColor="#4285F3"
            isFullWidth
            onPress={_onSocialNetworkConnectButtonPressed}>
            <Text isBold isWhite>
              Connect with Google
            </Text>
          </Button>
        </View>
      </Container>
    </View>
  );
};

export default Authentication;
