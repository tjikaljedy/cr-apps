import {
  IOSNativeProps,
  AndroidNativeProps,
} from '@react-native-community/datetimepicker';
import * as React from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useTheme} from '@src/hooks';

type DateTimePickerProps = IOSNativeProps | AndroidNativeProps;

const DateTimePicker: React.FC<DateTimePickerProps> = (props) => {
  const {colors} = useTheme();
  return <RNDateTimePicker {...props} style={{backgroundColor: colors.text}} />;
};

export default DateTimePicker;
