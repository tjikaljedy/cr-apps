import { DefaultTheme, DarkTheme } from '@react-navigation/native';
export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5956E9',
    secondary: '#6350FF',
    card: '#FFFFFF',
    text: '#333333',
    border: '#ededed',
  },
};
export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#A887FF',
    secondary: '#CAA4FF',
    card: '#282828',
    background: '#121212',
    border: '#333333',
  },
};
