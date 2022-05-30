import React, {useContext} from 'react';
import {useTheme} from './index';
import {StatusBar, StatusBarProps, Platform} from 'react-native';
//import SystemNavigationBar from 'react-native-system-navigation-bar';
type ParamProps = {
  inverse?: boolean;
  statusColor?: string;
  statusBaseLight?: boolean;
  navColor?: string;
  navBaseLight?: boolean;
};

const styleLight = 'light-content';
const styleDark = 'dark-content';
const inverseColor = 'transparent';
const blackColor = 'black';

const useStatusNav = (params: ParamProps) => {
  const {theme, colors} = useTheme();
  const baseColor = colors.card;
  const themeIsLight = theme === 'light';

  let navColor = params?.navColor === undefined ? baseColor : blackColor;
  let navStyle = params?.navBaseLight ? true : false;

  let barColor =
    params?.statusColor === undefined ? baseColor : params.statusColor;

  let baseLight =
    params?.statusBaseLight === undefined
      ? themeIsLight
      : params.statusBaseLight;

  const defaultNav = () => {
    console.log('>>>>>>>> DEFAULT' + theme);
    //const currStatusStyle = baseLight ? styleDark : styleLight;
    //navStyle = baseLight ? true : false;
    // StatusBar.setTranslucent(false);
    //StatusBar.setBarStyle(currStatusStyle);
    StatusBar.setBackgroundColor(baseColor);
    if (Platform.OS === 'android') {
      // SystemNavigationBar.setNavigationColor(baseColor, !themeIsLight);
    }
  };
  const translucentNav = () => {
    console.log('hree');

    if (Platform.OS === 'android') {
      //SystemNavigationBar.fullScreen(true);
      //const result = SystemNavigationBar.setNavigationColor(
      //   'hsla(110, 56%, 49%, 0.5)',
      //   !themeIsLight,
      // );
    }
    //StatusBar.setBackgroundColor('rgba(0,0,0,0.2)');
  };
  const leanBackNav = () => {};

  React.useEffect(() => {
    defaultNav();
  }, []);

  return {defaultNav, translucentNav, leanBackNav};
};

export default useStatusNav;
