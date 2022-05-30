import {StatusBar, StatusBarProps, Platform} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  border: string;
};

interface ScreenNavProp {
  routeName?: any;
  colors?: any;
  theme?: any;
  translucent?: boolean;
  statusColor?: string;
  isBarLight?: boolean;
  navColor?: string;
  isNavLight?: boolean;
}

interface StatusNavProp {
  defaultColor: any;
  defaultTheme: any;
  translucent?: boolean;
  statusColor?: string;
  isBarLight?: boolean;
  navColor?: string;
  isNavLight?: boolean;
}

class StatusNav {
  static setScreenNav = (params?: ScreenNavProp) => {
    const defaultColor = params?.colors as ThemeColors;
    const defaultTheme = params?.theme;
    if (
      params?.routeName === 'AcquireARScreen' ||
      params?.routeName === 'AcquireScreen'
    ) {
      StatusNav.setStatusNav({
        defaultColor: defaultColor,
        defaultTheme: defaultTheme,
        translucent: true,
      });
    } else if (params?.routeName === 'AuthenticationScreen') {
      StatusNav.setStatusNav({
        defaultColor: defaultColor,
        defaultTheme: defaultTheme,
        statusColor: defaultColor.primary,
        navColor: defaultColor.card,
      });
    } else if (params?.routeName === 'HomeScreen') {
      StatusNav.setStatusNav({
        defaultColor: defaultColor,
        defaultTheme: defaultTheme,
      });
    }
  };

  static setStatusNav = (params?: StatusNavProp) => {
    const styleLight = 'light-content';
    const styleDark = 'dark-content';
    const translucentColor = 'translucent';
    const blackColor = 'black';

    const colors = params?.defaultColor;
    const theme = params?.defaultTheme;

    const baseColor = colors.card;
    const themeIsLight = theme === 'light';
    var navStyle = params?.isNavLight ? params.isNavLight : themeIsLight;
    var barStyle = params?.isBarLight ? params.isBarLight : themeIsLight;
    const barStyleType = {
      styleType: barStyle ? styleDark : styleLight,
    };

    var navColor =
      params?.navColor === undefined ? baseColor : params?.navColor;
    var barColor =
      params?.statusColor === undefined ? baseColor : params?.statusColor;

    if (params?.translucent) {
      navColor = translucentColor;
      navStyle = false;
      barStyleType.styleType = styleLight;
      //StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('rgba(0,0,0,0.4)');
    } else {
      StatusBar.setTranslucent(false);
      StatusBar.setBackgroundColor(barColor);
    }
    StatusBar.setBarStyle(barStyleType.styleType as any);
    if (Platform.OS === 'android') {
      changeNavigationBarColor(navColor, navStyle, false);
    }
  };
}
export default StatusNav;
