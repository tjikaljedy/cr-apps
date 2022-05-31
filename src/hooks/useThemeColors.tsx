import {useSelector} from 'react-redux';
import {Appearance} from 'react-native';
import {lightTheme, darkTheme} from '@src/styles/theme';
import {ThemeState} from '@store/slices/themeSlice';

type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  border: string;
};

export default function () {
  const colorScheme = Appearance.getColorScheme();
  const defaultTheme = useSelector(
    (state: {themeSlice: ThemeState}) => state.themeSlice.theme,
  );

  const isSystemTheme = useSelector(
    (state: {themeSlice: ThemeState}) => state.themeSlice.useSystemTheme,
  ) as boolean;

  const currentTheme = !isSystemTheme ? defaultTheme : colorScheme;

  return buildTheme(isSystemTheme as boolean, currentTheme as string);
}

const buildTheme = (useSystemTheme: boolean, theme: string) => {
  const {colors} = theme === 'dark' ? darkTheme : lightTheme;
  const themeColors: ThemeColors = {
    ...colors,
  };
  return {
    theme,
    useSystemTheme,
    colors: themeColors,
    navTheme: theme === 'dark' ? darkTheme : lightTheme,
  };
};
