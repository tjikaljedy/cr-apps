import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../useRedux';

const sliceName = 'themeSlice';

const slice = createSlice({
  name: sliceName,
  initialState: {
    theme: 'dark',
    useSystemTheme: false,
  } as ThemeState,
  reducers: {
    changeTheme: (
      state: ThemeState,
      {payload: {theme, useSystemTheme}}: ThemePayload,
    ) => {
      state.theme = typeof theme !== 'undefined' ? theme : 'dark';
      state.useSystemTheme =
        typeof useSystemTheme !== 'undefined' ? useSystemTheme : false;
    },
    setDefaultTheme: (
      state: ThemeState,
      {payload: {theme, useSystemTheme}}: ThemePayload,
    ) => {
      state.theme = 'no-preference';
      state.useSystemTheme = useSystemTheme;
    },
  },
});

export const {changeTheme, setDefaultTheme} = slice.actions;
export const selectedTheme = (state: RootState) => state.themeSlice.theme;
export default slice.reducer;

export type ThemeState = {
  theme: 'light' | 'dark' | 'no-preference';
  useSystemTheme: boolean | null | undefined;
};

type ThemePayload = {
  payload: {
    theme: 'light' | 'dark' | 'no-preference';
    useSystemTheme: boolean | null | undefined;
  };
};
