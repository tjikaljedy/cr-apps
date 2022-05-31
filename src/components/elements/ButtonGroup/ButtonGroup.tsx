import * as React from 'react';
import {View, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {PressableOpacity} from 'react-native-pressable-opacity';
import Container from '../Container';
import Text from '../Text';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';

export type ButtonGrpOption = {
  value: string;
  name: string;
  iconElement: React.ReactElement;
};

type ButtonGrpProps = {
  data: ButtonGrpOption[];
  defaultValue: string;
  containerStyle: StyleProp<ViewStyle>;
  checkedStyle: StyleProp<ViewStyle>;
  defaultStyle: StyleProp<ViewStyle>;
  disabledOpacity?: number;
  onItemPressed: (option: ButtonGrpOption) => void;
};

const ButtonGroup: React.FC<ButtonGrpProps> = ({
  data,
  defaultValue,
  disabledOpacity,
  checkedStyle,
  defaultStyle,
  containerStyle,
  onItemPressed,
}) => {
  const [selectedValue, setSelectedValue] = React.useState<string>();
  const _onPress = (item: ButtonGrpOption) => {
    return () => {
      setSelectedValue(item.value);
      onItemPressed(item);
    };
  };

  return (
    <Container style={[{flex: 1}, containerStyle]}>
      {data.map((item, index) => {
        const {value, name, iconElement} = item;
        let isChecked = value === defaultValue;
        if (selectedValue) {
          isChecked = value === selectedValue;
        }
        return (
          <PressableOpacity
            key={`prs1-${index}`}
            style={isChecked ? checkedStyle : defaultStyle}
            disabledOpacity={disabledOpacity ? disabledOpacity : 0.4}
            onPress={_onPress(item)}>
            {iconElement}
          </PressableOpacity>
        );
      })}
    </Container>
  );
};

export default ButtonGroup;
