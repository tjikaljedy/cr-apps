import * as React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import {useTheme} from '@src/hooks';
import styles from './styles';

type DividerProps = {
  style?: StyleProp<ViewStyle>;
};

const Divider: React.FC<DividerProps> = ({style}) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.divider, {backgroundColor: colors.border}, style]} />
  );
};

export default Divider;
