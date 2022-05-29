import * as React from 'react';
import IconFontAwesome5, {
  FontAwesome5IconProps,
} from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@src/hooks';

interface OwnProps {
  isPrimary?: boolean;
  useIonicons?: boolean;
  useMaterialicons?: boolean;
}

type IconProps = OwnProps & FontAwesome5IconProps;

const Icon: React.FC<IconProps> = ({
  isPrimary,
  useIonicons,
  useMaterialicons,
  color,
  ...rest
}) => {
  const {
    colors: {text, primary},
  } = useTheme();
  let iconColor = isPrimary ? primary : text;
  if (color) {
    iconColor = color as string;
  }

  if (useIonicons) {
    return <Ionicons {...rest} color={iconColor} />;
  } else if (useMaterialicons) {
    return <MaterialCommunityIcons {...rest} color={iconColor} />;
  }

  return <IconFontAwesome5 {...rest} color={iconColor} />;
};

export default Icon;
