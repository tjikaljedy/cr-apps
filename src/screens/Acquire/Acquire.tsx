import * as React from 'react';
import {useTheme, useNavigation} from '@react-navigation/native';
import {Container, SnapCamera} from '@src/components/elements';
import NavProvider from '@src/components/common/NavProvider/NavProvider';
import AuthContext from '@src/context/auth-context';
import {profile} from '@src/data/mock-profile';
import styles from './styles';

type AcquireProps = {};

const Acquire: React.FC<AcquireProps> = () => {
  const navigation = useNavigation();
  const {userToken} = React.useContext(AuthContext);

  return (
    <>
      <NavProvider
        params={{
          overwrite: true,
          inverse: true,
        }}
      />
      <Container style={styles.acquireContainer}>
        <SnapCamera />
      </Container>
    </>
  );
};

export default Acquire;
