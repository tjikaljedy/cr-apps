import * as React from 'react';
import {useNavigation} from '@react-navigation/core';
import {Image, Animated, BackHandler, SafeAreaView} from 'react-native';
import Share from 'react-native-share';
import {PressableOpacity} from 'react-native-pressable-opacity';
import {ViroARSceneNavigator, ViroConstants} from '@viro-community/react-viro';
import CameraRoll from '@react-native-community/cameraroll';
//ViroTrackingStateConstants or ViroConstants
//Default
import PermissionContext from '@src/context/permission-context';
import {PermissionCamera} from '@src/components/elements/SnapCamera/PermissionCamera';
import AuthContext from '@src/context/auth-context';
import ReviewScene from './ReviewScene';
import {
  Container,
  SnapCameraAR,
  Carousel,
  Icon,
  ButtonGroup,
} from '@src/components/elements';
import {ButtonGrpOption} from '@src/components/elements/ButtonGroup/ButtonGroup';
import {RecordButton} from '@src/components/elements/SnapCameraAR/RecordButton';
import SnapDetail from '@src/components/elements/SnapCameraAR/SnapDetail';
import styles from './styles';
//REDUX

import {ArtRowItem} from '@src/redux/ArtRowItem';
import {PortalRowItem} from '@src/redux/PortalRowItem';
import {
  fetchArtsAPI,
  updateSelectedArt,
  updatePlanStatus,
  selectAllArts,
  updateCheckedArt,
} from '@src/redux/slices/artSlice';
import {
  fetchPortalsAPI,
  updateSelectedPortal,
  selectAllPortals,
} from '@src/redux/slices/portalSlice';
import {updateRenderType} from '@src/redux/slices/renderSlice';
import {useAppDispatch, useAppSelector} from '@src/redux/useRedux';
import PlanReady from '@src/components/elements/SnapCameraAR/PlanReady';

//Start
type AcquireARProps = {};
const kPreviewTypePhoto = 1;
const kPreviewTypeVideo = 2;

const AcquireAR: React.FC<AcquireARProps> = () => {
  const dispatch = useAppDispatch();
  const {isPass} = React.useContext(PermissionContext);
  const {userToken} = React.useContext(AuthContext);
  //Arts and Portal
  const allArts = useAppSelector(selectAllArts);
  const allPortals = useAppSelector(selectAllPortals);

  //Navigatiion and button
  const navigation = useNavigation();
  const arNavigatorRef = React.useRef<typeof ViroARSceneNavigator>();
  const [actionButton, setActionButton] = React.useState<
    'arts' | 'portals' | 'camera'
  >('arts');
  const [videoUrl, setVideoUrl] = React.useState('');
  const [haveSavedMedia, setHaveSavedMedia] = React.useState(false);
  const [playPreview, setPlayPreview] = React.useState(false);
  const [previewType, setPreviewType] = React.useState(kPreviewTypeVideo);

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

  const _onInitialized = (state: any, reason: any) => {
    var tackingNormal = false;
    if (state == ViroConstants.TRACKING_NORMAL) {
      tackingNormal = true;
    }
    dispatch(updatePlanStatus({planReady: tackingNormal}));
  };

  const _onItemArtPress = (item: ArtRowItem) => {
    dispatch(updateSelectedArt(item));
    dispatch(updateRenderType({modelRender: actionButton}));
  };

  const _onItemPortalPress = (item: PortalRowItem) => {
    dispatch(updateSelectedPortal(item));
    dispatch(updateRenderType({modelRender: actionButton}));
  };

  const _onStartRecording = () => {
    arNavigatorRef.current?._startVideoRecording(
      'crazyrich_video',
      false,
      (errorCode: any) => {
        //display error
        console.log(errorCode);
      },
    );
  };

  const _setIsPressingButton = () => {};

  const _onStopRecording = () => {
    arNavigatorRef.current?._stopVideoRecording().then((retDict: any) => {
      if (!retDict.success) {
        if (retDict.errorCode == ViroConstants.RECORD_ERROR_NO_PERMISSION) {
          console.log(retDict.errorCode);
        }
      }
      //setVideoUrl(retDict.url);
      CameraRoll.save(retDict.url);
    });
  };

  const _onClickState = (uuid: any, state: any, itemType: any) => {
    dispatch(updateCheckedArt(uuid));
  };

  const _openShareActionSheet = async () => {
    let contentType =
      previewType == kPreviewTypeVideo ? 'video/mp4' : 'image/png';

    await Share.open({
      subject: '#CrazyRich',
      message: '#CrazyRich',
      url: videoUrl,
      type: contentType,
    });
  };

  //SCREEN
  const _renderScreen = () => {
    return (
      <ReviewScene
        onInitialized={_onInitialized}
        onClickState={_onClickState}
      />
    );
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

  const MainControl = () => {
    return (
      <Animated.View style={[styles.bottomRow]}>
        <Container style={[styles.bottomRowControl]}>
          <Container style={[styles.bottomRowControlLeft]}>
            <ButtonGroup
              checkedStyle={styles.buttonChecked}
              defaultStyle={styles.buttonDefault}
              containerStyle={styles.bottomRowControlLeftGrp}
              data={actionModelOptions}
              defaultValue={'arts'}
              onItemPressed={(item: ButtonGrpOption) => {
                setActionButton(item.value as any);
              }}
            />
          </Container>
          <Container style={[styles.bottomRowControlCenter]}>
            <RecordButton
              enabled={true}
              style={styles.bottomRowControlLeftCenter}
              setIsPressingButton={_setIsPressingButton}
              onStartRecording={_onStartRecording}
              onStopRecording={_onStopRecording}
            />
          </Container>
          <RightControl />
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
      </Animated.View>
    );
  };
  const RightControl = () => {
    return (
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
    );
  };

  const BackButton = () => {
    return (
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
    );
  };

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={[styles.acquireContainer]}>
      <BackButton />
      {isPass ? (
        <>
          <SnapCameraAR
            arNavigatorRef={arNavigatorRef}
            onInitialScene={_renderScreen}
          />
          <PlanReady />
          <MainControl />
        </>
      ) : (
        <PermissionCamera />
      )}
      <SnapDetail />
    </SafeAreaView>
  );
};

export default AcquireAR;
