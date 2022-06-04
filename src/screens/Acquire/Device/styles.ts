import {StyleSheet, Dimensions} from 'react-native';
import {
  SAFE_AREA_PADDING,
  SCREEN_WIDTH,
  CONTENT_SPACING,
  BUTTON_SIZE,
  SAFE_BOTTOM,
  CAPTURE_BUTTON_PADDING,
} from '@src/constants';

export default StyleSheet.create({
  acquireContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  bottomLeftRow: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'flex-start',
    bottom: SAFE_AREA_PADDING.paddingBottom + 45,
    left: SAFE_AREA_PADDING.paddingLeft,
    backgroundColor: 'transparent',
  },
  bottomRightRow: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: SAFE_AREA_PADDING.paddingBottom + 45,
    right: SAFE_AREA_PADDING.paddingRight,
    backgroundColor: 'transparent',
  },
  squre: {
    marginBottom: CONTENT_SPACING,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: 10,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLeftRow: {
    position: 'absolute',
    left: SAFE_AREA_PADDING.paddingLeft,
    top: SAFE_AREA_PADDING.paddingTop,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
  circle: {
    marginBottom: CONTENT_SPACING,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
