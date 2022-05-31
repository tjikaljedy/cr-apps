import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../useRedux';

const sliceName = 'cameraSlice';

const slice = createSlice({
  name: sliceName,
  initialState: {
    label: 'Prompt',
    value: 'prompt',
  } as CameraState,
  reducers: {
    changeDefault: (state: CameraState, action: CameraLoad) => {
      state.label =
        typeof action.payload.label !== 'undefined'
          ? action.payload.label
          : 'Prompt';
      state.value =
        typeof action.payload.value !== 'undefined'
          ? action.payload.value
          : 'prompt';
    },
  },
});

export const {changeDefault} = slice.actions;
export const fetchDefault = (state: RootState) => state.cameraSlice;

export default slice.reducer;

export type CameraState = {
  label: 'Device' | 'AR' | 'Prompt';
  value: 'device' | 'ar' | 'prompt';
};

type CameraLoad = {
  payload: {
    label: 'Device' | 'AR' | 'Prompt';
    value: 'device' | 'ar' | 'prompt';
  };
};
