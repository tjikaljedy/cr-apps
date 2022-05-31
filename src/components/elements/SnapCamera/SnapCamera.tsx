import * as React from 'react';
import {StyleSheet} from 'react-native';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';
import {
  CameraDeviceFormat,
  CameraRuntimeError,
  FrameProcessorPerformanceSuggestion,
  PhotoFile,
  sortFormats,
  useCameraDevices,
  useFrameProcessor,
  VideoFile,
} from 'react-native-vision-camera';
import {Camera, frameRateIncluded} from 'react-native-vision-camera';
import Reanimated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import {PressableOpacity} from 'react-native-pressable-opacity';
//import * as ImagePicker from 'react-native-image-picker';
//Default
import Container from '../Container';
import Text from '../Text';
import {CaptureButton} from './CaptureButton';
import {
  MAX_ZOOM_FACTOR,
  SAFE_AREA_PADDING,
  CONTENT_SPACING,
  SCALE_FULL_ZOOM,
  BUTTON_SIZE,
} from '../../../constants';

import Icon from '../Icon';

type SnapCameraProps = {
  children?: React.ReactNode;
  onSwitchToAR?: () => void;
};

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

//Construct Component
const SnapCamera: React.FC<SnapCameraProps> = ({
  children,
  onSwitchToAR,
  ...rest
}) => {
  const navigation = useNavigation();
  const camera = React.useRef<Camera>(null);
  const [isCameraInitialized, setIsCameraInitialized] = React.useState(false);
  const [hasMicrophonePermission, setHasMicrophonePermission] =
    React.useState(false);
  const zoom = useSharedValue(0);
  const isPressingButton = useSharedValue(false);
  // check if camera page is active
  const isActive = useIsFocused();

  const [cameraPosition, setCameraPosition] = React.useState<'front' | 'back'>(
    'back',
  );
  const [enableHdr, setEnableHdr] = React.useState(false);
  const [flash, setFlash] = React.useState<'off' | 'on'>('off');
  const [enableNightMode, setEnableNightMode] = React.useState(false);

  // camera format settings
  const devices = useCameraDevices();
  const device = devices[cameraPosition];
  //const [device, setDevice] = React.useState(devices[cameraPosition]);

  const formats = React.useMemo<CameraDeviceFormat[]>(() => {
    if (device?.formats == null) return [];
    return device.formats.sort(sortFormats);
  }, [device?.formats]);

  //#region Memos
  const [is60Fps, setIs60Fps] = React.useState(true);
  const fps = React.useMemo(() => {
    if (!is60Fps) return 30;

    if (enableNightMode && !device?.supportsLowLightBoost) {
      // User has enabled Night Mode, but Night Mode is not natively supported, so we simulate it by lowering the frame rate.
      return 30;
    }

    const supportsHdrAt60Fps = formats.some(
      (f) =>
        f.supportsVideoHDR &&
        f.frameRateRanges.some((r) => frameRateIncluded(r, 60)),
    );
    if (enableHdr && !supportsHdrAt60Fps) {
      // User has enabled HDR, but HDR is not supported at 60 FPS.
      return 30;
    }

    const supports60Fps = formats.some((f) =>
      f.frameRateRanges.some((r) => frameRateIncluded(r, 60)),
    );
    if (!supports60Fps) {
      // 60 FPS is not supported by any format.
      return 30;
    }
    // If nothing blocks us from using it, we default to 60 FPS.
    return 60;
  }, [
    device?.supportsLowLightBoost,
    enableHdr,
    enableNightMode,
    formats,
    is60Fps,
  ]);

  const supportsCameraFlipping = React.useMemo(
    () => devices.back != null && devices.front != null,
    [devices.back, devices.front],
  );
  const supportsFlash = device?.hasFlash ?? false;
  const supportsHdr = React.useMemo(
    () => formats.some((f) => f.supportsVideoHDR || f.supportsPhotoHDR),
    [formats],
  );
  const supports60Fps = React.useMemo(
    () =>
      formats.some((f) =>
        f.frameRateRanges.some((rate) => frameRateIncluded(rate, 60)),
      ),
    [formats],
  );
  const canToggleNightMode = enableNightMode
    ? true // it's enabled so you have to be able to turn it off again
    : (device?.supportsLowLightBoost ?? false) || fps > 30; // either we have native support, or we can lower the FPS
  //#endregion

  //const format = React.useMemo(() => {
  //  if (device) {
  //    return device.formats.find(
  //      (item) => item.videoWidth === 640 && item.videoHeight === 480,
  //    );
  //  }
  //  return undefined;
  //}, [device]);

  const format = React.useMemo(() => {
    let result = formats;
    if (enableHdr) {
      result = result.filter((f) => f.supportsVideoHDR || f.supportsPhotoHDR);
      return result.find((f) =>
        f.frameRateRanges.some((r) => frameRateIncluded(r, fps)),
      );
    } else {
      //result.map((d) => {
      //console.log(d);
      //});
    }
    return undefined;
  }, [formats, fps, enableHdr]);

  //#region Animated Zoom
  // This just maps the zoom factor to a percentage value.
  // so e.g. for [min, neutr., max] values [1, 2, 128] this would result in [0, 0.0081, 1]
  const minZoom = device?.minZoom ?? 1;
  const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR);

  const cameraAnimatedProps = useAnimatedProps(() => {
    const z = Math.max(Math.min(zoom.value, maxZoom), minZoom);
    return {
      zoom: z,
    };
  }, [maxZoom, minZoom, zoom]);
  //#endregion

  //#region Callbacks
  const setIsPressingButton = React.useCallback(
    (_isPressingButton: boolean) => {
      isPressingButton.value = _isPressingButton;
    },
    [isPressingButton],
  );
  // Camera callbacks
  const onError = React.useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);
  //
  const onInitialized = React.useCallback(() => {
    console.log('Camera initialized!');
    setIsCameraInitialized(true);
  }, []);
  //
  const onMediaCaptured = React.useCallback(
    (media: PhotoFile | VideoFile, type: 'photo' | 'video') => {
      console.log(`Media captured! ${JSON.stringify(media)}`);
    },
    [navigation],
  );
  //
  const onFlipCameraPressed = React.useCallback(() => {
    setCameraPosition((p) => (p === 'back' ? 'front' : 'back'));
  }, []);
  //
  const onFlashPressed = React.useCallback(() => {
    setFlash((f) => (f === 'off' ? 'on' : 'off'));
  }, []);
  //#endregion

  //#region Tap Gesture
  const onDoubleTap = React.useCallback(() => {
    onFlipCameraPressed();
  }, [onFlipCameraPressed]);
  //#endregion

  //#region Effects
  const neutralZoom = device?.neutralZoom ?? 1;
  React.useEffect(() => {
    // Run everytime the neutralZoomScaled value changes. (reset zoom when device changes)
    zoom.value = neutralZoom;
  }, [neutralZoom, zoom]);

  React.useEffect(() => {
    Camera.getMicrophonePermissionStatus().then((status) =>
      setHasMicrophonePermission(status === 'authorized'),
    );
  }, []);
  //#endregion

  //#region Pinch to Zoom Gesture
  // The gesture handler maps the linear pinch gesture (0 - 1) to an exponential curve since a camera's zoom
  // function does not appear linear to the user. (aka zoom 0.1 -> 0.2 does not look equal in difference as 0.8 -> 0.9)
  const onPinchGesture = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    {startZoom?: number}
  >({
    onStart: (_, context) => {
      context.startZoom = zoom.value;
    },
    onActive: (event, context) => {
      // we're trying to map the scale gesture to a linear zoom here
      const startZoom = context.startZoom ?? 0;
      const scale = interpolate(
        event.scale,
        [1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM],
        [-1, 0, 1],
        Extrapolate.CLAMP,
      );
      zoom.value = interpolate(
        scale,
        [-1, 0, 1],
        [minZoom, startZoom, maxZoom],
        Extrapolate.CLAMP,
      );
    },
  });
  //#endregion

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    //const values = examplePlugin(frame);
    //console.log(`Return Values: ${JSON.stringify(values)}`);
  }, []);

  const onFrameProcessorSuggestionAvailable = React.useCallback(
    (suggestion: FrameProcessorPerformanceSuggestion) => {
      console.log(
        `Suggestion available! ${suggestion.type}: Can do ${suggestion.suggestedFrameProcessorFps} FPS`,
      );
    },
    [],
  );

  const _onGalleryPickup = React.useCallback((type?: any, options?: any) => {
    // ImagePicker.launchImageLibrary({mediaType: 'mixed'}, setResponse);
  }, []);

  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      setIsCameraInitialized(false);
      //StatusBar.setBackgroundColor(navColor as string);
      //StatusBar.setBarStyle(navStyle ? 'dark-content' : 'light-content');
      //changeNavigationBarColor(navColor as string, navStyle, false);
    });
  }, [navigation]);

  return (
    <>
      {device != null && (
        <Container style={[styles.cameraContainer]}>
          <PinchGestureHandler
            onGestureEvent={onPinchGesture}
            enabled={isActive}>
            <Reanimated.View style={StyleSheet.absoluteFill}>
              <TapGestureHandler onEnded={onDoubleTap} numberOfTaps={2}>
                <ReanimatedCamera
                  ref={camera}
                  isActive={isActive}
                  style={StyleSheet.absoluteFill}
                  device={device}
                  format={format}
                  fps={fps}
                  hdr={enableHdr}
                  lowLightBoost={
                    device.supportsLowLightBoost && enableNightMode
                  }
                  onInitialized={onInitialized}
                  onError={onError}
                  enableZoomGesture={false}
                  animatedProps={cameraAnimatedProps}
                  photo={true}
                  video={true}
                  audio={hasMicrophonePermission}
                  frameProcessor={
                    device.supportsParallelVideoProcessing
                      ? frameProcessor
                      : undefined
                  }
                  orientation="portrait"
                  frameProcessorFps={1}
                  onFrameProcessorPerformanceSuggestionAvailable={
                    onFrameProcessorSuggestionAvailable
                  }
                />
              </TapGestureHandler>
            </Reanimated.View>
          </PinchGestureHandler>

          <CaptureButton
            style={styles.bottomRow}
            camera={camera}
            onMediaCaptured={onMediaCaptured}
            cameraZoom={zoom}
            minZoom={minZoom}
            maxZoom={maxZoom}
            flash={supportsFlash ? flash : 'off'}
            enabled={isCameraInitialized && isActive}
            setIsPressingButton={setIsPressingButton}
          />
          <Container style={styles.bottomLeftRow}>
            <PressableOpacity
              style={styles.squre}
              onPress={_onGalleryPickup}
              disabledOpacity={0.4}>
              <Icon name="images-outline" useIonicons color="white" size={24} />
            </PressableOpacity>
          </Container>
          <Container style={styles.bottomRightRow}>
            <PressableOpacity
              style={styles.squre}
              onPress={onSwitchToAR}
              disabledOpacity={0.4}>
              <Icon name="cube-scan" useMaterialicons color="white" size={30} />
            </PressableOpacity>
          </Container>
          <Container style={styles.topRightRow}>
            {supportsCameraFlipping && (
              <PressableOpacity
                style={styles.button}
                onPress={onFlipCameraPressed}
                disabledOpacity={0.4}>
                <Icon
                  name="camera-reverse"
                  useIonicons
                  color="white"
                  size={24}
                />
              </PressableOpacity>
            )}
            {supportsFlash && (
              <PressableOpacity
                style={styles.button}
                onPress={onFlashPressed}
                disabledOpacity={0.4}>
                <Icon
                  name={flash === 'on' ? 'flash' : 'flash-off'}
                  useIonicons
                  color="white"
                  size={24}
                />
              </PressableOpacity>
            )}
            {supports60Fps && (
              <PressableOpacity
                style={styles.button}
                onPress={() => setIs60Fps(!is60Fps)}>
                <Text style={styles.text}>
                  {is60Fps ? '60' : '30'}
                  {'\n'}FPS
                </Text>
              </PressableOpacity>
            )}
            {supportsHdr && (
              <PressableOpacity
                style={styles.button}
                onPress={() => setEnableHdr((h) => !h)}>
                <Icon
                  name={enableHdr ? 'hdr' : 'hdr-off'}
                  useMaterialicons
                  color="white"
                  size={24}
                />
              </PressableOpacity>
            )}
            {canToggleNightMode && (
              <PressableOpacity
                style={styles.button}
                onPress={() => setEnableNightMode(!enableNightMode)}
                disabledOpacity={0.4}>
                <Icon
                  name={enableNightMode ? 'moon' : 'moon-outline'}
                  useIonicons
                  color="white"
                  size={24}
                />
              </PressableOpacity>
            )}
            <PressableOpacity style={styles.button} disabledOpacity={0.4}>
              <Icon
                name={'settings-outline'}
                useIonicons
                color="white"
                size={24}
              />
            </PressableOpacity>
          </Container>
        </Container>
      )}
    </>
  );
};

SnapCamera.defaultProps = {};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  topRightRow: {
    position: 'absolute',
    right: SAFE_AREA_PADDING.paddingRight,
    top: SAFE_AREA_PADDING.paddingTop,
    backgroundColor: 'transparent',
  },
  bottomRow: {
    position: 'absolute',
    bottom: SAFE_AREA_PADDING.paddingBottom + 53,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  bottomLeftRow: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'flex-start',
    bottom: SAFE_AREA_PADDING.paddingBottom + 45,
    left: SAFE_AREA_PADDING.paddingLeft + 10,
    backgroundColor: 'transparent',
  },
  bottomRightRow: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: SAFE_AREA_PADDING.paddingBottom + 45,
    right: SAFE_AREA_PADDING.paddingRight + 10,
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
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SnapCamera;
