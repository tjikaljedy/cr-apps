import * as React from 'react';
import {Text as BaseText, TextProps as BaseTextProps} from 'react-native';
import {useTheme} from '@src/hooks';

interface TextProps extends BaseTextProps {
  children?: React.ReactNode;
  isPrimary?: boolean;
  isSecondary?: boolean;
  isBold?: boolean;
  isHeadingTitle?: boolean;
  isCenter?: boolean;
  isWhite?: boolean;
  hasMargin?: boolean;
}

const Text: React.FC<TextProps> = ({
  children,
  isPrimary,
  isSecondary,
  isWhite,
  isBold,
  isHeadingTitle,
  isCenter,
  hasMargin,
  style,
  ...rest
}) => {
  const {colors} = useTheme();
  let color = colors.text;
  let fontSize = 14;
  let marginTop = 0;
  let textAlign: 'auto' | 'center' | 'left' | 'right' | 'justify' | undefined;

  if (isSecondary) {
    color = colors.secondary;
    fontSize = 13;
  }

  if (isHeadingTitle) {
    fontSize = 20;
  }

  if (isPrimary) {
    color = colors.primary;
  }

  if (isWhite) {
    color = 'white';
  }

  if (isCenter) {
    textAlign = 'center';
  }

  if (hasMargin) {
    marginTop = 10;
  }

  const fontWeight = isBold ? 'bold' : 'normal';
  return (
    <BaseText
      {...rest}
      style={[
        {
          color,
          fontWeight,
          fontSize,
          textAlign,
          marginTop,
        },
        style,
      ]}>
      {children}
    </BaseText>
  );
};

export default Text;
