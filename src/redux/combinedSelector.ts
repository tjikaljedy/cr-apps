import {createSelector} from '@reduxjs/toolkit';
import {ArtRowItem} from './ArtRowItem';
import {selectAllArts} from './slices/artSlice';
import {PortalRowItem} from './PortalRowItem';
import {selectAllPortals} from './slices/portalSlice';
/**
 * Filters out users that are NOT in the follow list
 */
export const selectSortedArts = createSelector([selectAllArts], (arts) => {
  let currentArts: ArtRowItem[] = arts;

  return currentArts;
});

export const selectArtsById = (arg1: any) =>
  createSelector([selectAllArts], (arts) => {
    let currentArts: ArtRowItem[] = arts;
    console.log(arg1);
    return currentArts;
  });

export const selectSortedPortals = createSelector(
  [selectAllPortals],
  (portals) => {
    let currentPortals: PortalRowItem[] = portals;

    return currentPortals;
  },
);
