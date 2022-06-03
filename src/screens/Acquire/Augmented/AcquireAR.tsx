import * as React from 'react';
import {useNavigation} from '@react-navigation/core';
import {Image, Animated, BackHandler} from 'react-native';
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
  ButtonGroup,
} from '@src/components/elements';
import AuthContext from '@src/context/auth-context';
import ReviewScene from './ReviewScene';
import styles from './styles';
import {ArtRowItem} from '@src/redux/ArtRowItem';
import {PortalRowItem} from '@src/redux/PortalRowItem';
import {
  fetchArtsAPI,
  fetchPlanStatus,
  updateSelectedArt,
  updatePlanStatus,
  selectAllArts,
} from '@src/redux/slices/artSlice';
import {
  fetchPortalsAPI,
  updateSelectedPortal,
  selectAllPortals,
} from '@src/redux/slices/portalSlice';
import {updateRenderType} from '@src/redux/slices/renderSlice';
import {useAppDispatch, useAppSelector} from '@src/redux/useRedux';
import {ButtonGrpOption} from '@src/components/elements/ButtonGroup/ButtonGroup';
import {RecordButton} from '@src/components/elements/SnapCameraAR/RecordButton';
type AcquireARProps = {};

const AcquireAR: React.FC<AcquireARProps> = () => {
  BackHandler.addEventListener('hardwareBackPress', function () {
    return true;
  });

  const dispatch = useAppDispatch();
  const {isPass} = React.useContext(PermissionContext);
  const {userToken} = React.useContext(AuthContext);
  //Arts and Portal
  const allArts = useAppSelector(selectAllArts);
  const planReady = useAppSelector(fetchPlanStatus);
  const allPortals = useAppSelector(selectAllPortals);

  //Navigatiion and button
  const navigation = useNavigation();
  const fadeIn = React.useRef(new Animated.Value(0)).current;
  const fadeOut = React.useRef(new Animated.Value(1)).current;
  const [actionButton, setActionButton] = React.useState<
    'arts' | 'portals' | 'camera'
  >('arts');

  const actionModelOptions: ButtonGrpOption[] = [
    {
      name: 'portals',
      value: 'portals',
      iconElement: (
        <Icon name="dock-window" useMaterialicons color="white" size={30} />
      ),
    },
    {
      name: 'arts',
      value: 'arts',
      iconElement: (
        <Icon name="cube-outline" useMaterialicons color="white" size={30} />
      ),
    },
  ];

  React.useEffect(() => {
    dispatch<any>(fetchArtsAPI());
    dispatch<any>(fetchPortalsAPI());
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

  const _renderRecord = () => {
    return (
      <RecordButton enabled={true} style={styles.bottomRowControlLeftCenter} />
    );
  };

  const _renderScreen = () => {
    return <ReviewScene onInitialized={_onInitialized} />;
  };

  //ARTS
  const _renderItemArts = (item: ArtRowItem) => {
    return (
      <PressableOpacity onPress={() => _onItemArtPress(item)}>
        <Image
          style={[styles.artImage, {borderColor: 'white'}]}
          source={item.icon_img}
        />
      </PressableOpacity>
    );
  };

  const _onItemArtPress = (item: ArtRowItem) => {
    dispatch(updateSelectedArt(item));
    dispatch(updateRenderType({modelRender: actionButton}));
  };

  //PORTALS
  const _renderItemPortals = (item: PortalRowItem) => {
    return (
      <PressableOpacity onPress={() => _onItemPortalPress(item)}>
        <Image
          style={[styles.artImage, {borderColor: 'white'}]}
          source={item.icon_img}
        />
      </PressableOpacity>
    );
  };

  const _onItemPortalPress = (item: PortalRowItem) => {
    dispatch(updateSelectedPortal(item));
    dispatch(updateRenderType({modelRender: actionButton}));
  };

  return (
    <Container style={[styles.acquireContainer]}>
      <Container style={styles.topLeftRow}>
        <PressableOpacity
          style={[styles.circle]}
          disabledOpacity={0.4}
          onPress={() => {
            navigation.navigate('HomeScreen' as never);
          }}>
          <Icon name="close" useIonicons color="white" size={28} />
        </PressableOpacity>
      </Container>
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
          <Container style={[styles.bottomRow]}>
            <Container style={[styles.bottomRowControl]}>
              <Container style={[styles.bottomRowControlLeft]}>
                <ButtonGroup
                  checkedStyle={styles.buttonChecked}
                  defaultStyle={styles.buttonDefault}
                  containerStyle={styles.bottomRowControlLeftLeft}
                  data={actionModelOptions}
                  defaultValue={'arts'}
                  onItemPressed={(item: ButtonGrpOption) => {
                    setActionButton(item.value as any);
                  }}
                />
              </Container>
              <Container style={[styles.bottomRowControlCenter]}>
                {_renderRecord()}
              </Container>
              <Container style={[styles.bottomRowControlRight]}>
                <Container style={styles.bottomRowControlLeftRight}>
                  <PressableOpacity
                    style={[styles.squre]}
                    disabledOpacity={0.4}
                    onPress={() => {
                      navigation.navigate(
                        'AcquireScreen' as never,
                        {screen: 'AcquireDevice'} as never,
                      );
                    }}>
                    <Icon
                      name="camera-switch"
                      useMaterialicons
                      color="white"
                      size={24}
                    />
                  </PressableOpacity>
                </Container>
              </Container>
            </Container>
            <Carousel
              data={actionButton === 'arts' ? allArts : allPortals}
              renderContent={
                actionButton === 'arts' ? _renderItemArts : _renderItemPortals
              }
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
