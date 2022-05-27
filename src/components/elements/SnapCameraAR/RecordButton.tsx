import React, {useCallback, useMemo, useRef} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import Reanimated, {
  cancelAnimation,
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedGestureHandler,
  useSharedValue,
  withRepeat,
} from 'react-native-reanimated';

import {
  CAPTURE_BUTTON_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../constants';

const PAN_GESTURE_HANDLER_FAIL_X = [-SCREEN_WIDTH, SCREEN_WIDTH];
const PAN_GESTURE_HANDLER_ACTIVE_Y = [-2, 2];

const START_RECORDING_DELAY = 200;
const BORDER_WIDTH = CAPTURE_BUTTON_SIZE * 0.1;

interface Props extends ViewProps {
  //camera: React.RefObject<Camera>;
  onMediaCaptured?: (media?: any, type?: 'photo' | 'video') => void;

  minZoom?: number;
  maxZoom?: number;
  cameraZoom?: Reanimated.SharedValue<number>;

  flash?: 'off' | 'on';

  enabled: boolean;

  setIsPressingButton?: (isPressingButton: boolean) => void;
}

const _RecordButton: React.FC<Props> = ({
  onMediaCaptured,
  minZoom,
  maxZoom,
  cameraZoom,
  flash,
  enabled,
  setIsPressingButton,
  style,
  ...props
}): React.ReactElement => {
  const pressDownDate = useRef<Date | undefined>(undefined);
  const isRecording = useRef(false);
  const recordingProgress = useSharedValue(0);

  const isPressingButton = useSharedValue(false);

  //#region Tap handler
  const tapHandler = useRef<TapGestureHandler>();
  const onHandlerStateChanged = useCallback(
    async ({nativeEvent: event}: TapGestureHandlerStateChangeEvent) => {
      console.debug(`state: ${Object.keys(State)[event.state]}`);
    },
    [isPressingButton, recordingProgress, setIsPressingButton],
  );
  //#endregion
  //#region Pan handler
  const panHandler = useRef<PanGestureHandler>();
  const onPanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {offsetY?: number; startY?: number}
  >({
    onStart: (event, context) => {
      context.startY = event.absoluteY;
      const yForFullZoom = context.startY * 0.7;
      const offsetYForFullZoom = context.startY - yForFullZoom;

      // extrapolate [0 ... 1] zoom -> [0 ... Y_FOR_FULL_ZOOM] finger position
      //context.offsetY = interpolate(
      //  cameraZoom.value,
      //  [minZoom, maxZoom],
      //  [0, offsetYForFullZoom],
      //  Extrapolate.CLAMP,
      //);
    },
    onActive: (event, context) => {
      const offset = context.offsetY ?? 0;
      const startY = context.startY ?? SCREEN_HEIGHT;
      const yForFullZoom = startY * 0.7;

      //cameraZoom.value = interpolate(
      //  event.absoluteY - offset,
      //  [yForFullZoom, startY],
      //  [maxZoom, minZoom],
      //  Extrapolate.CLAMP,
      //);
    },
  });
  //#endregion

  const shadowStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: withSpring(isPressingButton.value ? 1 : 0, {
            mass: 1,
            damping: 35,
            stiffness: 300,
          }),
        },
      ],
    }),
    [isPressingButton],
  );
  const buttonStyle = useAnimatedStyle(() => {
    let scale: number;
    if (enabled) {
      if (isPressingButton.value) {
        scale = withRepeat(
          withSpring(1, {
            stiffness: 100,
            damping: 1000,
          }),
          -1,
          true,
        );
      } else {
        scale = withSpring(0.9, {
          stiffness: 500,
          damping: 300,
        });
      }
    } else {
      scale = withSpring(0.6, {
        stiffness: 500,
        damping: 300,
      });
    }

    return {
      opacity: withTiming(enabled ? 1 : 0.3, {
        duration: 100,
        easing: Easing.linear,
      }),
      transform: [
        {
          scale: scale,
        },
      ],
    };
  }, [enabled, isPressingButton]);

  return (
    <>
      <TapGestureHandler
        enabled={true}
        ref={tapHandler}
        onHandlerStateChange={onHandlerStateChanged}
        shouldCancelWhenOutside={false}
        maxDurationMs={99999999}
        simultaneousHandlers={panHandler}>
        <Reanimated.View {...props} style={[buttonStyle, style]}>
          <PanGestureHandler
            enabled={true}
            ref={panHandler}
            failOffsetX={PAN_GESTURE_HANDLER_FAIL_X}
            activeOffsetY={PAN_GESTURE_HANDLER_ACTIVE_Y}
            onGestureEvent={onPanGestureEvent}
            simultaneousHandlers={tapHandler}>
            <Reanimated.View style={styles.captureContainer}>
              <Reanimated.View
                style={[styles.captureButtonRecord, shadowStyle]}
              />
              <View style={styles.captureButton} />
            </Reanimated.View>
          </PanGestureHandler>
        </Reanimated.View>
      </TapGestureHandler>
    </>
  );
};

export const RecordButton = React.memo(_RecordButton);

const styles = StyleSheet.create({
  captureContainer: {
    flex: 1,
  },
  captureButton: {
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: 'white',
  },
  captureButtonRecord: {
    position: 'absolute',
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    backgroundColor: '#e34077',
  },
});
