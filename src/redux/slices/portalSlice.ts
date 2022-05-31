import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from '@reduxjs/toolkit';

import {mockPortals} from '@src/data/mock-portals';
import {PortalRowItem} from '@src/redux/PortalRowItem';
import {RootState} from '../useRedux';

const sliceName = 'portalSlice';
type portal = PortalRowItem;

export type PortalState = {
  loading?: boolean | null | undefined;
  planReady?: boolean | null | undefined;
  allPortals?: Array<PortalRowItem>;
  selectedPortal?: PortalRowItem;
};

type PortalPayload = {
  payload: {
    loading?: boolean | null | undefined;
    planReady?: boolean | null | undefined;
    allPortals?: Array<PortalRowItem>;
    selectedPortal?: PortalRowItem;
  };
};

//Sample from ts-rn
export const fetchPortalsAPI = createAsyncThunk(
  `${sliceName}/fetchPortals-api`,
  async () => {
    return mockPortals;
  },
);
//Source from modern-redux
const portalsAdapter = createEntityAdapter<portal>({
  selectId: (portal: PortalRowItem) => portal.id as any,
});

const slice = createSlice({
  name: sliceName,
  initialState: portalsAdapter.getInitialState({
    loading: false,
    planReady: false,
    allPortals: [],
    selectedPortal: undefined,
  } as PortalState),
  reducers: {
    updatePortalPlanStatus(
      state: PortalState,
      {payload: {planReady}}: PortalPayload,
    ) {
      state.planReady = planReady;
    },
    updateSelectedPortal(
      state: PortalState,
      action: PayloadAction<PortalRowItem>,
    ) {
      state.allPortals?.push(action.payload);
      state.selectedPortal = action.payload;
    },
    resetSelectionPortals(state: PortalState) {
      state.allPortals = [];
      state.selectedPortal = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPortalsAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPortalsAPI.fulfilled, (state, action) => {
      portalsAdapter.setAll(state, action.payload);
      state.loading = false;
    });
    builder.addCase(fetchPortalsAPI.rejected, (state) => {
      state.loading = false;
    });
  },
});

//Sample from ts-rn
const {actions, reducer} = slice;

export const {
  updatePortalPlanStatus,
  updateSelectedPortal,
  resetSelectionPortals,
} = actions;
export const fetchAllSelectionPortals = (state: RootState) =>
  state.portalSlice.allPortals;
export const selectePortal = (state: RootState) =>
  state.portalSlice.selectedPortal;
export const fetchPortalPlanStatus = (state: RootState) =>
  state.portalSlice.planReady;

export const {selectAll: selectPortals} = portalsAdapter.getSelectors(
  (state: RootState) => state.portalSlice,
);
export default reducer;
