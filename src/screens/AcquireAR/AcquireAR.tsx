import * as React from 'react';
import {useNavigation} from '@react-navigation/core';
import {Image, Animated} from 'react-native';
import LottieView from 'lottie-react-native';
import {PressableOpacity} from 'react-native-pressable-opacity';
import {ViroConstants} from '@viro-community/react-viro';
//ViroTrackingStateConstants or ViroConstants
//Default
import PermissionContext from '@src/context/permission-context';
import {PermissionCamera} from '@src/components/elements/SnapCamera/PermissionCamera';

import {
  Container,
  SnapCameraAR,
  Carousel,
  Icon,
} from '@src/components/elements';
import AuthContext from '@src/context/auth-context';
import ReviewScene from './ReviewScene';
import styles from './styles';
import {ArtRowItem} from '@src/redux/ArtRowItem';
import {
  fetchArtsAPI,
  fetchPlanStatus,
  updateSelectedArt,
  updatePlanStatus,
} from '@src/redux/slices/artSlice';
import {selectSortedArts} from '@src/redux/combinedSelector';
import {useAppDispatch, useAppSelector} from '@src/redux/useRedux';
type AcquireARProps = {};

const AcquireAR: React.FC<AcquireARProps> = () => {
  const dispatch = useAppDispatch();
  const {isPass} = React.useContext(PermissionContext);
  const {userToken} = React.useContext(AuthContext);
  const allArts = useAppSelector(selectSortedArts);
  const planReady = useAppSelector(fetchPlanStatus);
  const navigation = useNavigation();

  const fadeIn = React.useRef(new Animated.Value(0)).current;
  const fadeOut = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    dispatch<any>(fetchArtsAPI());
  }, [dispatch]);

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

  const _onInitialized = (state: any, reason: any) => {
    var tackingNormal = false;
    if (state == ViroConstants.TRACKING_NORMAL) {
      tackingNormal = true;
    }
    dispatch(updatePlanStatus({planReady: tackingNormal}));
  };

  const _renderScreen = () => {
    return <ReviewScene onInitialized={_onInitialized} />;
  };

  const _renderItem = (item: ArtRowItem) => {
    return (
      <PressableOpacity onPress={() => _onItemPress(item)}>
        <Image
          style={[styles.artImage, {borderColor: 'white'}]}
          source={item.icon_img}
        />
      </PressableOpacity>
    );
  };

  const _onItemPress = (item: ArtRowItem) => {
    dispatch(updateSelectedArt(item));
  };

  return (
    <Container style={[styles.acquireContainer]}>
      {isPass ? (
        <>
          <SnapCameraAR onInitialScene={_renderScreen} />
          <Container style={styles.topCenterRow}>
            {!planReady ? (
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
            ) : (
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
            )}
          </Container>
          <Container style={styles.topRightRow}>
            <PressableOpacity style={[styles.button]} disabledOpacity={0.4}>
              <Icon
                name="camera"
                useIonicons
                color="white"
                size={24}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </PressableOpacity>
          </Container>
          <Container style={styles.bottomLeftRow}>
            <PressableOpacity
              style={[styles.button, {backgroundColor: `rgba(0,0,0,0.4)`}]}
              disabledOpacity={0.4}>
              <Icon
                name="cube-outline"
                useMaterialicons
                color="white"
                size={30}
              />
            </PressableOpacity>
          </Container>
          <Container style={[styles.bottomRow]}>
            <Carousel
              data={allArts}
              renderContent={_renderItem}
              itemWidth={60}
              enableSnap={false}
              hasPagination={false}
            />
          </Container>
        </>
      ) : (
        <PermissionCamera />
      )}
    </Container>
  );
};

export default AcquireAR;
