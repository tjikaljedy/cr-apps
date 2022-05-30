import {StyleSheet} from 'react-native';
import {
  SAFE_AREA_PADDING,
  SCREEN_WIDTH,
  CONTENT_SPACING,
  BUTTON_SIZE,
  SAFE_BOTTOM,
} from '@src/constants';

export default StyleSheet.create({
  acquireContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  screenNavContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'translucent',
  },
  topCenterRow: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: SAFE_AREA_PADDING.paddingTop,
    backgroundColor: 'transparent',
  },
  topRightRow: {
    position: 'absolute',
    right: SAFE_AREA_PADDING.paddingRight,
    top: SAFE_AREA_PADDING.paddingTop,
    backgroundColor: 'transparent',
  },
  bottomRow: {
    position: 'absolute',
    bottom: SAFE_AREA_PADDING.paddingBottom + 33,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingTop: 5,
    paddingBottom: 5,
  },
  bottomLeftRow: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'flex-start',
    bottom: SAFE_AREA_PADDING.paddingBottom + 100,
    left: SAFE_AREA_PADDING.paddingLeft,
    backgroundColor: 'transparent',
  },
  bottomRightRow: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: SAFE_AREA_PADDING.paddingBottom + 100,
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
  button: {
    marginBottom: CONTENT_SPACING,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  artItemContainer: {
    flexShrink: 1,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  artItemContainer2: {
    width: SCREEN_WIDTH,
    backgroundColor: 'transparent',
  },
  artImage: {
    height: 47,
    width: 47,
    borderWidth: 1.5,
    borderRadius: 9,
  },
});
