import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../useRedux';

const sliceName = 'renderSlice';

interface RenderTypeProps {
  modelRender: any;
}

const slice = createSlice({
  name: sliceName,
  initialState: {
    modelRender: 'arts',
  } as RenderState,
  reducers: {
    updateRenderType: (state: RenderState, action: RenderLoad) => {
      state.modelRender = action.payload.modelRender;
    },
  },
});

export const {updateRenderType} = slice.actions;
export const fetchCurrentType = (state: RootState) => state.renderSlice;
export default slice.reducer;

export type RenderState = {
  modelRender: string;
};

type RenderLoad = {
  payload: {
    modelRender: string;
  };
};
