import {ImageSourcePropType} from 'react-native';

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
}

export const NONE = 'NONE';
export const LOADING = 'LOADING';
export const LOAD_ERROR = 'ERROR';
export const LOADED = 'LOADED';
export const POSITION_OFFSET = 0.05;
