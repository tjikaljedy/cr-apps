import * as React from 'react';
import {StatusBar, StatusBarProps, Platform} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color-fix-behavior-status-bar';
import {useIsFocused} from '@react-navigation/native';
import {useTheme} from '@src/hooks';
type ParamProps = {
  overwrite: boolean;
  inverse?: boolean;
  statusColor?: string;
  statusBaseLight?: boolean;
  navColor?: string;
  navBaseLight?: boolean;
};

interface NavProviderProps extends StatusBarProps {
  children?: any;
  params: ParamProps;
}

const NavProvider: React.FC<NavProviderProps> = ({
  children,
  params = {
    overwrite: false,
    inverse: false,
    statusColor: undefined,
    statusBaseLight: true,
    navColor: undefined,
    navBaseLight: true,
  },
  ...rest
}) => {
  //Identifiy theme is light or dark
  //Identify bar passing is light or dark event when using color from theme
  const isFocused = useIsFocused();
  const {theme, colors} = useTheme();
  const inverseColor = 'transparent';
  const blackColor = 'black';
  const themeIsLight = theme === 'light';
  const styleLight = 'light-content';
  const styleDark = 'dark-content';
  const baseColor = colors.card;

  //Logical
  //Navigation bar if set light=true mean all font is dark

  let barColor =
    params.statusColor === undefined ? baseColor : params.statusColor;
  let navColor = params.navColor === undefined ? blackColor : baseColor;
  let navStyle = params.navBaseLight ? true : false;
  if (isFocused) {
    if (params.inverse) {
      barColor = inverseColor;
      navColor = 'translucent';
      StatusBar.setBarStyle(styleLight);
      StatusBar.setTranslucent(true);
      navStyle = false;
    } else {
      StatusBar.setTranslucent(false);
      if (params.overwrite) {
        const currStatusStyle = params.statusBaseLight ? styleDark : styleLight;
        navStyle = params.navBaseLight ? true : false;
        StatusBar.setBarStyle(currStatusStyle);
      } else {
        const currStatusStyle = themeIsLight ? styleDark : styleLight;
        navStyle = themeIsLight ? true : false;
        StatusBar.setBarStyle(currStatusStyle);
      }
    }

    if (Platform.OS === 'android') {
      changeNavigationBarColor(navColor, navStyle, false);
    }
    StatusBar.setBackgroundColor(barColor);

    return <StatusBar {...rest} />;
  }

  return null;
};

export default NavProvider;
