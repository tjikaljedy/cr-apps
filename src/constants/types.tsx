import {Platform} from 'react-native';

import {Permission, PERMISSIONS} from 'react-native-permissions';

const PermissionIos = [
  PERMISSIONS.IOS.CAMERA,
  PERMISSIONS.IOS.MICROPHONE,
  PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PERMISSIONS.IOS.PHOTO_LIBRARY,
];
const PermissionAndroid = [
  PERMISSIONS.ANDROID.CAMERA,
  PERMISSIONS.ANDROID.RECORD_AUDIO,
  PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
];

const PLATFORM_PERMISSIONS = Platform.select<
  typeof PERMISSIONS.ANDROID | typeof PERMISSIONS.IOS | {}
>({
  android: PermissionAndroid,
  ios: PermissionIos,
  default: {},
});

export const PERMISSIONS_VALUES: Permission[] =
  Object.values(PLATFORM_PERMISSIONS);

export const PERMISSION_MSG = [
  {
    title: 'Camera permission needs',
    icon: 'camera',
  },
  {
    title: 'Microphone permission needs',
    icon: 'microphone',
  },
  {
    title: 'Location permission needs',
    icon: 'map',
  },
  {
    title: 'Photo library permission needs',
    icon: 'folder',
  },
];
