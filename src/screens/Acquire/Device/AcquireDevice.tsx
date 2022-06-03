import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '@src/redux/useRedux';
import {resetSelectionArts} from '@src/redux/slices/artSlice';
import {Container, Icon, SnapCamera} from '@src/components/elements';
import PermissionContext from '@src/context/permission-context';
import {PermissionCamera} from '@src/components/elements/SnapCamera/PermissionCamera';
import AuthContext from '@src/context/auth-context';

import styles from './styles';
import {ScreenNavigationProps} from '@src/routes/Stacks/types';
import {PressableOpacity} from 'react-native-pressable-opacity';
import {BackHandler} from 'react-native';

type AcquireDeviceProps = {};
const AcquireDevice: React.FC<AcquireDeviceProps> = () => {
  BackHandler.addEventListener('hardwareBackPress', function () {
    return true;
  });

  const dispatch = useAppDispatch();
  const {isPass} = React.useContext(PermissionContext);
  const navigation = useNavigation();
  const {userToken} = React.useContext(AuthContext);

  const _onSwitchToAR = React.useCallback((type?: any, options?: any) => {
    dispatch(resetSelectionArts());
    navigation.navigate(
      'AcquireScreen' as never,
      {screen: 'AcquireAR'} as never,
    );
  }, []);

  const _onGalleryPickup = React.useCallback((type?: any, options?: any) => {
    // ImagePicker.launchImageLibrary({mediaType: 'mixed'}, setResponse);
  }, []);

  const _renderGaleryPickup = () => {
    return (
      <Container style={styles.bottomLeftRow}>
        <PressableOpacity
          style={styles.squre}
          onPress={_onGalleryPickup}
          disabledOpacity={0.4}>
          <Icon name="images-outline" useIonicons color="white" size={24} />
        </PressableOpacity>
      </Container>
    );
  };

  const _renderSwithcToAR = () => {
    return (
      <Container style={styles.bottomRightRow}>
        <PressableOpacity
          style={styles.squre}
          onPress={_onSwitchToAR}
          disabledOpacity={0.4}>
          <Icon name="cube-scan" useMaterialicons color="white" size={30} />
        </PressableOpacity>
      </Container>
    );
  };

  return (
    <Container style={styles.acquireContainer}>
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
        <SnapCamera
          onSwitchToAR={_renderSwithcToAR()}
          onGalleryPickup={_renderGaleryPickup()}
        />
      ) : (
        <PermissionCamera />
      )}
    </Container>
  );
};

export default AcquireDevice;
