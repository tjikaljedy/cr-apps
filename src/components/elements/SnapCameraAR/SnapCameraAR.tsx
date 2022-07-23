import * as React from 'react';
import {StyleSheet} from 'react-native';
import {ViroARSceneNavigator} from '@viro-community/react-viro';

interface IProps {
  arNavigatorRef: any;
  bloomEnabled?: boolean;
  hdrEnabled?: boolean;
  autoFocus?: boolean;
  onInitialScene: () => void;
}

interface IState {
  bloomEnabled?: boolean;
  hdrEnabled?: boolean;
  autoFocus?: boolean;
}

export default class SnapCameraAR extends React.PureComponent<IProps, IState> {
  state: IState = {
    bloomEnabled: this.props.bloomEnabled ? this.props.bloomEnabled : false,
    hdrEnabled: this.props.hdrEnabled ? this.props.hdrEnabled : false,
    autoFocus: this.props.autoFocus ? this.props.autoFocus : false,
  };
  // worldAlignment={'GravityAndHeading'}
  render() {
    return (
      <ViroARSceneNavigator
        ref={this.props.arNavigatorRef as never}
        style={styles.screenNavContainer}
        initialScene={{
          scene: this.props.onInitialScene as any,
        }}
      />
    );
  }
}
const styles = StyleSheet.create({
  screenNavContainer: {
    flex: 1,
  },
});
