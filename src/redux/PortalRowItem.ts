import {ImageSourcePropType} from 'react-native';

export const NONE = 'NONE';
export const LOADING = 'LOADING';
export const LOAD_ERROR = 'ERROR';
export const LOADED = 'LOADED';
export const POSITION_OFFSET = 0.05;
export const PS_TYPE_VIDEO = 'Video';
export const PS_TYPE_360_VIDEO = '360_Video';
export const PS_TYPE_PHOTO = 'Photo';
export const PS_TYPE_360_PHOTO = '360_Photo';

export type ITEM_TYPE = 'PORTAL';

export interface Image360 {
  source: ImageSourcePropType;
  width: number;
  height: number;
}

export interface PortalRowItem {
  id?: string;
  name?: string;
  seq?: number;
  icon_img: ImageSourcePropType;
  obj?: ImageSourcePropType;
  portal360Image?: Image360;
  resources?: Array<ImageSourcePropType>;
  frameType?: string;
  scale?: any;
  portalScale?: any;
  position?: any;
  materials?: any;
  animation?: any;
  loading?: string;
  physics?: any;
  ref_pointer?: any;
  selected?: boolean;
  item_type: ITEM_TYPE;
}
