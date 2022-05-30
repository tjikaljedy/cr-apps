import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useStatusNav} from '@src/hooks';
import {useAppDispatch} from '@src/redux/useRedux';
import {resetSelectionArts} from '@src/redux/slices/artSlice';
import {Container, SnapCamera} from '@src/components/elements';
import PermissionContext from '@src/context/permission-context';
import {PermissionCamera} from '@src/components/elements/SnapCamera/PermissionCamera';
import AuthContext from '@src/context/auth-context';

import styles from './styles';

type AcquireProps = {};

const Acquire: React.FC<AcquireProps> = () => {
  const dispatch = useAppDispatch();
  const {isPass} = React.useContext(PermissionContext);
  const navigation = useNavigation();
  const {userToken} = React.useContext(AuthContext);

  const _onSwitchToAR = React.useCallback((type?: any, options?: any) => {
    dispatch(resetSelectionArts());
    navigation.navigate('AcquireARScreen' as any);
  }, []);

  return (
    <Container style={styles.acquireContainer}>
      {isPass ? (
        <SnapCamera onSwitchToAR={_onSwitchToAR} />
      ) : (
        <PermissionCamera />
      )}
    </Container>
  );
};

export default Acquire;
