import React, {useCallback, useMemo, useRef} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {
  PanGestureHandler,
  State,
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import Reanimated, {
  Easing,
  useAnimatedStyle,
  withSpring,
  withTiming,
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
  onStartRecording: () => void;
  onStopRecording: () => void;
  onMediaCaptured?: (media?: any, type?: 'photo' | 'video') => void;
  enabled: boolean;
  setIsPressingButton: (isPressingButton: boolean) => void;
}

const _RecordButton: React.FC<Props> = ({
  onStartRecording,
  onStopRecording,
  onMediaCaptured,
  enabled,
  setIsPressingButton,
  style,
  ...props
}): React.ReactElement => {
  const pressDownDate = useRef<Date | undefined>(undefined);
  const isRecording = useRef(false);
  const recordingProgress = useSharedValue(0);
  const isPressingButton = useSharedValue(false);

  const tapHandler = useRef<TapGestureHandler>();
  const _onHandlerStateChanged = useCallback(
    async ({nativeEvent: event}: TapGestureHandlerStateChangeEvent) => {
      console.debug(`state: ${Object.keys(State)[event.state]}`);
      switch (event.state) {
        case State.BEGAN: {
          if (recordingProgress.value === 0) {
            recordingProgress.value = 0;
            isPressingButton.value = true;
            const now = new Date();
            pressDownDate.current = now;
            setTimeout(() => {
              if (pressDownDate.current === now) {
                recordingProgress.value++;
                setIsPressingButton(true);
                onStartRecording();
              }
            }, START_RECORDING_DELAY);
          } else {
            //Stop Recording
            setTimeout(() => {
              isPressingButton.value = false;
              setIsPressingButton(false);
              recordingProgress.value = 0;
              onStopRecording();
            }, 500);
          }
          return;
        }
        case State.END:
        case State.FAILED:
        case State.CANCELLED: {
          const now = new Date();
          const diff =
            now.getTime() -
            (pressDownDate.current == null
              ? 0
              : pressDownDate.current.getTime());
          pressDownDate.current = undefined;
          if (diff < START_RECORDING_DELAY) {
            setTimeout(() => {
              isPressingButton.value = false;
              setIsPressingButton(false);
            }, 500);
          }
        }
        default:
          break;
      }
    },
    [isPressingButton, recordingProgress, setIsPressingButton],
  );

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
        onHandlerStateChange={_onHandlerStateChanged}
        shouldCancelWhenOutside={false}
        maxDurationMs={99999999}>
        <Reanimated.View {...props} style={[buttonStyle, style]}>
          <Reanimated.View style={styles.captureContainer}>
            <Reanimated.View
              style={[styles.captureButtonRecord, shadowStyle]}
            />
            <View style={styles.captureButton} />
          </Reanimated.View>
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
