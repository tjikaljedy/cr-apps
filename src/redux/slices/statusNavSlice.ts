import {
  createSlice,
  createSelector,
  createEntityAdapter,
  PayloadAction,
} from '@reduxjs/toolkit';
import {RootState} from '../useRedux';
import {selectedTheme} from './themeSlice';

const sliceName = 'statusnav';

interface StatusNavProps {
  themeMode: any;
  themeColor: any;
}

const slice = createSlice({
  name: sliceName,
  initialState: {
    default: undefined,
    current: undefined,
  } as StatusNavState,
  reducers: {
    initialDefault: (state: StatusNavState, action: StatusNavLoad) => {
      console.log(action.payload);
      state.default = action.payload.default;
      state.current = action.payload.current;
    },
  },
  /*extraReducers: (builder) => {
    builder.addDefaultCase((initialState, action) => {
      initialState.current = {themeColor: 'dd', themeMode: ''};
      initialState.default = {themeColor: 'dd', themeMode: ''};
    });
  },*/
});

export const {initialDefault} = slice.actions;
export const fetchDefault = (state: RootState) => state.statusnav;
export default slice.reducer;
/*
const currentTheme = createSelector([selectedTheme], (theme) => {
  return theme.theme;
});

const currentStatusNav = createSelector(
  [currentTheme, fetchDefault],
  (theme, statusnav) => {
    return statusnav;
  },
);
*/
export type StatusNavState = {
  default: StatusNavProps | undefined;
  current: StatusNavProps | undefined;
};

type StatusNavLoad = {
  payload: {
    default: StatusNavProps | undefined;
    current: StatusNavProps | undefined;
  };
};
