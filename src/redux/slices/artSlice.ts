import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from '@reduxjs/toolkit';

import {mockArts} from '@src/data/mock-arts';
import {ArtRowItem} from '@src/redux/ArtRowItem';
import {RootState} from '../useRedux';

const sliceName = 'artSlice';
type arts = ArtRowItem;

export type ArtState = {
  loading?: boolean | null | undefined;
  planReady?: boolean | null | undefined;
  allArts?: Array<ArtRowItem>;
  selectedArt?: ArtRowItem;
};

type ArtPayload = {
  payload: {
    loading?: boolean | null | undefined;
    planReady?: boolean | null | undefined;
    allArts?: Array<ArtRowItem>;
    selectedArt?: ArtRowItem;
  };
};

//Sample from ts-rn
export const fetchArtsAPI = createAsyncThunk(
  `${sliceName}/fetchArts-api`,
  async () => {
    return mockArts;
  },
);
//Source from modern-redux
const artsAdapter = createEntityAdapter<arts>({
  selectId: (arts: ArtRowItem) => arts.id as any,
});

const slice = createSlice({
  name: sliceName,
  initialState: artsAdapter.getInitialState({
    loading: false,
    planReady: false,
    allArts: [],
    selectedArt: undefined,
  } as ArtState),
  reducers: {
    updatePlanStatus(state: ArtState, {payload: {planReady}}: ArtPayload) {
      state.planReady = planReady;
    },
    updateSelectedArt(state: ArtState, action: PayloadAction<ArtRowItem>) {
      state.allArts?.push(action.payload);
      state.selectedArt = action.payload;
    },
    resetSelectionArts(state: ArtState) {
      state.allArts = [];
      state.selectedArt = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArtsAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArtsAPI.fulfilled, (state, action) => {
      artsAdapter.setAll(state, action.payload);
      state.loading = false;
    });
    builder.addCase(fetchArtsAPI.rejected, (state) => {
      state.loading = false;
    });
  },
});

//Sample from ts-rn
const {actions, reducer} = slice;

export const {updatePlanStatus, updateSelectedArt, resetSelectionArts} =
  actions;
export const fetchAllSelectionArts = (state: RootState) =>
  state.artSlice.allArts;
export const selectedArt = (state: RootState) => state.artSlice.selectedArt;
export const fetchPlanStatus = (state: RootState) => state.artSlice.planReady;

export const {selectAll: selectArts} = artsAdapter.getSelectors(
  (state: RootState) => state.artSlice,
);
export default reducer;
