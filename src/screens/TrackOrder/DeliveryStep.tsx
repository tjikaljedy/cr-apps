import * as React from 'react';
import {View} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {StepIndicatorStyles} from 'react-native-step-indicator/lib/typescript/src/types';
import styles from './styles';
import {useTheme} from '@src/hooks';

type DeliveryStepProps = {};

const labels = [
  'Order submitted',
  'Order confirmed',
  'Preparing your order',
  'Order is ready at the restaurant',
  'Driver is picking up your order',
  'Order completed',
];

const DeliveryStep: React.FC<DeliveryStepProps> = () => {
  const {colors} = useTheme();

  const stepIndicatorStyles: StepIndicatorStyles = {
    currentStepIndicatorSize: 35,
    stepStrokeCurrentColor: colors.primary,
    separatorFinishedColor: colors.primary,
    separatorUnFinishedColor: colors.secondary,
    stepIndicatorFinishedColor: colors.primary,
    stepIndicatorUnFinishedColor: colors.card,
    stepIndicatorCurrentColor: colors.background,
    stepIndicatorLabelFontSize: 12,
    currentStepIndicatorLabelFontSize: 12,
    stepIndicatorLabelCurrentColor: colors.text,
    stepIndicatorLabelFinishedColor: 'white',
    stepIndicatorLabelUnFinishedColor: colors.text,
    labelColor: colors.text,
    labelAlign: 'flex-start',
    currentStepLabelColor: colors.primary,
    separatorStrokeWidth: 2,
  };

  return (
    <View style={styles.deliveryStepContainer}>
      <StepIndicator
        customStyles={stepIndicatorStyles}
        currentPosition={2}
        labels={labels}
        direction="vertical"
        stepCount={6}
      />
    </View>
  );
};

export default DeliveryStep;
