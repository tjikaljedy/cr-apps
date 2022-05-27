import * as React from 'react';
import {ViroARSceneNavigator} from '@viro-community/react-viro';

interface IProps {
  initialScene: any;
  autoFocus?: boolean;
  onInitialized: (state: any, reason: any) => void;
  //modelItems?: ArtRowItem;
}

interface IState {}

export default class SnapCameraAR extends React.PureComponent<IProps, IState> {
  render() {
    return (
      <ViroARSceneNavigator
        bloomEnabled={true}
        hdrEnabled={true}
        style={{flex: 1}}
        initialScene={{
          scene: () => {
            return this.props.initialScene;
          },
        }}
      />
    );
  }
}
