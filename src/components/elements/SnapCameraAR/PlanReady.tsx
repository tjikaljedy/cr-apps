import React from 'react';
import {StyleSheet, Image, Animated} from 'react-native';
import LottieView from 'lottie-react-native';
//
import {fetchPlanStatus} from '@src/redux/slices/artSlice';
import {useAppSelector} from '@src/redux/useRedux';
import {SAFE_AREA_PADDING} from '@src/constants';
import Container from '../Container';
type PlanReadyProps = {};

const PlanReady: React.FC<PlanReadyProps> = () => {
  const planReady = useAppSelector(fetchPlanStatus);

  const fadeIn = React.useRef(new Animated.Value(0)).current;
  const fadeOut = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: planReady ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.sequence([
      Animated.timing(fadeOut, {
        toValue: planReady ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeOut, {
        toValue: 0,
        delay: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [planReady, fadeIn, fadeOut]);

  const _renderReady = () => {
    return (
      <Animated.View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 50,
          opacity: fadeOut,
        }}>
        <Image
          style={{
            flex: 1,
            height: 80,
            marginBottom: 10,
            resizeMode: 'contain',
          }}
          source={require('@src/assets/arts/icon_initializing_device.png')}
        />
        <Image
          style={{
            flex: 1,
            resizeMode: 'contain',
            height: 30,
          }}
          source={require('@src/assets/arts/icon_initializing_text_done.png')}
        />
      </Animated.View>
    );
  };

  const _renderInitial = () => {
    return (
      <Animated.View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 50,
          opacity: fadeIn,
        }}>
        <LottieView
          style={{
            alignSelf: 'center',
            width: '45%',
            marginBottom: 10,
          }}
          source={require('@src/assets/animations/load-ar-screen.json')}
          autoPlay
          loop={true}
          onAnimationFinish={() => {}}
        />
        <Image
          style={{
            flex: 1,
            resizeMode: 'contain',
            height: 30,
          }}
          source={require('@src/assets/arts/icon_initializing_text.png')}
        />
      </Animated.View>
    );
  };
  return (
    <Container style={styles.topCenterRow}>
      {!planReady ? _renderInitial() : _renderReady()}
    </Container>
  );
};

const styles = StyleSheet.create({
  topCenterRow: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: SAFE_AREA_PADDING.paddingTop,
    backgroundColor: 'transparent',
  },
});
export default PlanReady;
