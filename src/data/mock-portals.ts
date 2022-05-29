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
    id: faker.datatype.uuid(),
    name: 'portal_window_frame',
    selected: false,
    loading: NONE,
    icon_img: {
      uri: `https://crazyrich-app.herokuapp.com/portals/icon_portal_windowframe.png`,
    },
    obj: require('@src/assets/portals/portal_window_frame/portal_window_frame.vrx'),
    materials: null,
    portal360Image: {
      source: require('@src/assets/portals/image360/360_guadalupe.jpg'),
      width: 2,
      height: 1,
    },
    animation: null,
    scale: [1, 1, 1],
    portalScale: [0.275, 0.275, 0.275],
    position: [0, 0, 0],
    frameType: 'VRX',
    item_type: 'PORTAL',
    physics: undefined,
    ref_pointer: undefined,
    resources: [
      require('@src/assets/portals/portal_window_frame/portal_window_frame_specular.png'),
      require('@src/assets/portals/portal_window_frame/portal_window_frame_diffuse.png'),
      require('@src/assets/portals/portal_window_frame/portal_window_frame_normal.png'),
    ],
  },
];
