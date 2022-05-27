import * as React from 'react';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';
import {useTheme} from '@src/hooks';

type LoadingIndicatorProps = {
  hasMargin?: boolean;
} & ActivityIndicatorProps;

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  hasMargin,
  ...rest
}) => {
  const {colors} = useTheme();
  let margin = 0;
  if (hasMargin) {
    margin = 15;
  }
  return (
    <ActivityIndicator
      color={colors.primary}
      {...rest}
      style={{
        margin,
      }}
    />
  );
};
export default LoadingIndicator;
