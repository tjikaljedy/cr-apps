import * as React from 'react';
import {View, ScrollView, Alert, Image} from 'react-native';
import {SafeAreaView} from 'react-native';
import {Text, TextField, Button} from '@src/components/elements';
import {useTheme} from '@src/hooks';
import styles from './styles';
import AuthContext from '@src/context/auth-context';
import {useNavigation} from '@react-navigation/native';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const navigation = useNavigation();
  const {signIn} = React.useContext(AuthContext);
  const {colors} = useTheme();
  const [password, setPassword] = React.useState('');

  const _onPasswordFieldChange = (value: string) => {
    setPassword(value);
  };

  const _onNextButtonPressed = () => {
    if (!password) {
      Alert.alert('Error', 'Please enter your password!');
      return;
    }
    signIn();
  };
  const _onForgotPasswordButtonPressed = () => {
    navigation.navigate('ForgotPasswordScreen' as any);
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Image
            source={require('@src/assets/profile/avatar.png')}
            style={styles.avatar}
          />
          <Text isBold isHeadingTitle>
            Welcome! Users
          </Text>
          <Text isSecondary hasMargin>
            Please enter your password to use our services
          </Text>
          <TextField
            autoFocus
            style={[{backgroundColor: colors.card}, styles.passwordTextField]}
            value={password}
            onChangeText={_onPasswordFieldChange}
            hasMargin
            placeholder="Enter your password"
            secureTextEntry={true}
          />
        </View>
        <Button isFullWidth onPress={_onNextButtonPressed}>
          <Text isBold>Next</Text>
        </Button>
        <Button
          isFullWidth
          isTransparent
          onPress={_onForgotPasswordButtonPressed}
          style={styles.forgotPasswordButton}>
          <Text>Forgot Password</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
