import {ImageSourcePropType} from 'react-native';

export const NONE = 'NONE';
export const LOADING = 'LOADING';
export const LOAD_ERROR = 'ERROR';
export const LOADED = 'LOADED';
export const POSITION_OFFSET = 0.05;
export type ITEM_TYPE = 'ART';

export interface ArtRowItem {
  id?: string;
  name?: string;
  seq?: number;
  icon_img: ImageSourcePropType;
  obj?: ImageSourcePropType;
  resources?: Array<ImageSourcePropType>;
  type?: string;
  item_type: ITEM_TYPE;
  scale?: any;
  position?: any;
  materials?: any;
  animation?: any;
  loading?: string;
  emitter_name?: any;
  shadow_width?: number;
  shadow_height?: number;
  spotlight_position_x?: number;
  spotlight_position_y?: number;
  spotlight_position_z?: number;
  lighting_mode?: string;
  shadowfarz?: number;
  physics?: any;
  ref_pointer?: any;
  selected?: boolean;
}
