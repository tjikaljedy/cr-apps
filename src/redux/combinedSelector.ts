import {createSelector} from '@reduxjs/toolkit';
import {ArtRowItem} from './ArtRowItem';
import {selectArts} from './slices/artSlice';

/**
 * Filters out users that are NOT in the follow list
 */
export const selectSortedArts = createSelector([selectArts], (arts) => {
  let currentArts: ArtRowItem[] = arts;

  return currentArts;
});
