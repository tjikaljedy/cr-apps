import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from '@reduxjs/toolkit';
import {mockArts} from '@src/data/mock-arts';
import {ArtRowItem, CheckedArtItem} from '@src/redux/ArtRowItem';
import {RootState} from '../useRedux';

const sliceName = 'artSlice';
type arts = ArtRowItem;

export type ArtState = {
  loading?: boolean | null | undefined;
  planReady?: boolean | null | undefined;
  allArts?: Array<ArtRowItem>;
  selectedArt?: ArtRowItem;
  checkedArt?: CheckedArtItem;
};

type ArtPayload = {
  payload: {
    loading?: boolean | null | undefined;
    planReady?: boolean | null | undefined;
    allArts?: Array<ArtRowItem>;
    selectedArt?: ArtRowItem;
    uuid?: string;
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
    checkedArt: undefined,
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
    updateCheckedArt(state: ArtState, action: PayloadAction<string>) {
      const now = new Date();
      let allDatas = state.allArts?.find((f) => f.id === action.payload);
      state.checkedArt = {
        checked_time: now.getTime(),
        item_art: allDatas as ArtRowItem,
      };
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

export const {
  updatePlanStatus,
  updateSelectedArt,
  resetSelectionArts,
  updateCheckedArt,
} = actions;
export const fetchAllSelectionArts = (state: RootState) =>
  state.artSlice.allArts;
export const selectedArt = (state: RootState) => state.artSlice.selectedArt;
export const checkedArt = (state: RootState) => state.artSlice.checkedArt;
export const fetchPlanStatus = (state: RootState) => state.artSlice.planReady;

export const {selectAll: selectAllArts} = artsAdapter.getSelectors(
  (state: RootState) => state.artSlice,
);
export default reducer;
