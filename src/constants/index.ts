import {Dimensions, Platform} from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

export const SAFE_BOTTOM =
  Platform.select({
    ios: StaticSafeAreaInsets.safeAreaInsetsBottom,
  }) ?? 0;

export const AppReviewConfig = {
  USES_UNTIL_SHOW: 'appReviewUsesUntilShow',
  REMIND_LATER_DATE: 'appReviewRemindLaterDate',
  CANCELED: 'appReviewCanceled',
};

export const CAPTURE_BUTTON_SIZE = 58;
export const CAPTURE_BUTTON_PADDING = 103;
export const MAX_ZOOM_FACTOR = 20;
export const CONTENT_SPACING = 15;

export const SAFE_AREA_PADDING = {
  paddingLeft: StaticSafeAreaInsets.safeAreaInsetsLeft + CONTENT_SPACING,
  paddingTop: StaticSafeAreaInsets.safeAreaInsetsTop + CONTENT_SPACING,
  paddingRight: StaticSafeAreaInsets.safeAreaInsetsRight + CONTENT_SPACING,
  paddingBottom: SAFE_BOTTOM + CONTENT_SPACING,
};

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Platform.select<number>({
  android:
    Dimensions.get('screen').height - StaticSafeAreaInsets.safeAreaInsetsBottom,
  ios: Dimensions.get('window').height,
}) as number;

export const SCALE_FULL_ZOOM = 3;
export const BUTTON_SIZE = 40;
