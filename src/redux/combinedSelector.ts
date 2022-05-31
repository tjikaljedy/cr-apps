import {createSelector} from '@reduxjs/toolkit';
import {ArtRowItem} from './ArtRowItem';
import {selectArts} from './slices/artSlice';
import {PortalRowItem} from './PortalRowItem';
import {selectPortals} from './slices/portalSlice';
/**
 * Filters out users that are NOT in the follow list
 */
export const selectSortedArts = createSelector([selectArts], (arts) => {
  let currentArts: ArtRowItem[] = arts;

  return currentArts;
});

export const selectSortedPortals = createSelector(
  [selectPortals],
  (portals) => {
    let currentPortals: PortalRowItem[] = portals;

    return currentPortals;
  },
);
