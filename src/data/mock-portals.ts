import {ImageSourcePropType} from 'react-native';
const faker = require('@faker-js/faker');
import {
  PortalRowItem,
  LOADED,
  LOADING,
  LOAD_ERROR,
  NONE,
  POSITION_OFFSET,
} from '@src/redux/PortalRowItem';

export const mockPortals: PortalRowItem[] = [
  {
    name: 'portal_window_frame',
    selected: false,
    loading: NONE,
    icon_img: require('../res/icon_portal_windowframe.png'),
    obj: require('../res/portal_window_frame/portal_window_frame.vrx'),
    materials: null,
    portal360Image: {
      source: require('../res/360_guadalupe.jpg'),
      width: 2,
      height: 1,
    },
    animation: null,
    scale: [1, 1, 1],
    portalScale: [0.275, 0.275, 0.275],
    position: [0, 0, 0],
    frameType: 'VRX',
    physics: undefined,
    ref_pointer: undefined,
    resources: [
      require('../res/portal_window_frame/portal_window_frame_specular.png'),
      require('../res/portal_window_frame/portal_window_frame_diffuse.png'),
      require('../res/portal_window_frame/portal_window_frame_normal.png'),
    ],
  },
];
