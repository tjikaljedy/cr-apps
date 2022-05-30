import * as React from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {SafeAreaView} from 'react-native';
import {Text, Button} from '@src/components/elements';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useTheme} from '@src/hooks';
import styles from './styles';
import {useNavigation, StackActions} from '@react-navigation/native';

type AuthVerificationCodeProps = {};

const CELL_COUNT = 5;

const AuthVerificationCode: React.FC<AuthVerificationCodeProps> = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [value, setValue] = React.useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const _onNextButtonPressed = () => {
    if (value.length !== 5) {
      Alert.alert('Error', 'Verification code is not valid!');
      return;
    }
    navigation.dispatch(StackActions.replace('LoginScreen'));
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Text isBold isHeadingTitle>
            Verification Code
          </Text>
          <Text isSecondary hasMargin>
            A verification code has been sent to your mobile phone
          </Text>
          <View style={styles.verificationCodeContainer}>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[
                    styles.cell,
                    {
                      borderColor: isFocused ? colors.primary : colors.border,
                    },
                  ]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
        </View>
        <Button isFullWidth onPress={_onNextButtonPressed}>
          <Text isBold>Next</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthVerificationCode;
