import * as React from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroSpotLight,
  ViroConstants,
} from '@viro-community/react-viro';
import {ArtRowItem} from '@src/redux/ArtRowItem';
import ArtItemRender from '@src/components/elements/SnapCameraAR/ArtItemRender';
import {connect} from 'react-redux';
import {RootState} from '@src/redux/useRedux';
const faker = require('@faker-js/faker');

const mapStateToProps = (state: RootState) => ({
  allArts: state.storiesAR.allArts,
  selectArt: state.storiesAR.selectedArt,
});
const mapDispatchToProps = () => ({});

interface IProps {
  onInitialized: (state: any, reason: any) => void;
}
interface IState {
  modelItems: any;
}

class ReviewScene extends React.PureComponent<
  ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    IProps,
  IState
> {
  private arSceneRef: React.RefObject<typeof ViroARScene> = React.createRef();
  private renderedObjects: any = [];
  private defaultBitMask = 2;
  _onLoadCallback = (uuid: any, state: any) => {};

  _onHitTestMethod = (callback: any) => {
    this.arSceneRef.current
      .getCameraOrientationAsync()
      .then((orientation: any) => {
        this.arSceneRef.current
          .performARHitTestWithRay(orientation.forward)
          .then((results: any) => {
            callback(orientation.position, orientation.forward, results);
          });
      });
  };

  _renderModels = () => {
    const modelItem = this.props.selectArt as ArtRowItem;
    if (modelItem) {
      var uuid = faker.datatype.uuid();
      var itemBitMask = Math.pow(2, this.defaultBitMask);
      this.renderedObjects.push(
        <ArtItemRender
          key={uuid}
          modelIDProps={modelItem}
          bitMask={itemBitMask}
          onLoadCallback={this._onLoadCallback}
          hitTestMethod={this._onHitTestMethod}
        />,
      );
      this.defaultBitMask++;
    }

    return this.renderedObjects;
  };

  render() {
    let models = this._renderModels();
    return (
      <ViroARScene
        ref={this.arSceneRef}
        physicsWorld={{gravity: [0, -9.81, 0]} as any}
        onTrackingUpdated={this.props.onInitialized}>
        <ViroAmbientLight color="#ffffff" intensity={20} />
        <ViroDirectionalLight color="#ffffff" direction={[0, -1, -0.2]} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, 1, 0]}
          position={[0, -7, 0]}
          color="#ffffff"
          intensity={250}
        />
        {models}
      </ViroARScene>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(ReviewScene);
