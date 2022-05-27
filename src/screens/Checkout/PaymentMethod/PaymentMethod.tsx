import * as React from 'react';
import {Section, Container, Text, Icon, Button} from '@src/components/elements';
import styles from './styles';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@src/hooks';

type PaymentMethodProps = {};

const PaymentMethod: React.FC<PaymentMethodProps> = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const _onAddAPromoButtonPressed = () => {
    navigation.navigate('PromotionScreen' as any);
  };

  const _onPaymentMethodButtonPressed = () => {
    navigation.navigate('PaymentMethodScreen' as any);
  };

  return (
    <Section title="Payment Method" titleColor={colors.text}>
      <Container style={styles.paymentMethodContainer}>
        <View style={styles.paymentSelection}>
          <Button
            icon={<Icon name="money-check-alt" size={16} />}
            isTransparent
            onPress={_onPaymentMethodButtonPressed}>
            <Text style={styles.paymentMethodText}> Cash</Text>
          </Button>
        </View>
        <Button isTransparent onPress={_onAddAPromoButtonPressed}>
          <Text isPrimary>Add a promo</Text>
        </Button>
      </Container>
    </Section>
  );
};

export default PaymentMethod;
