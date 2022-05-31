import * as React from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroSpotLight,
} from '@viro-community/react-viro';
import {ArtRowItem} from '@src/redux/ArtRowItem';
import {PortalRowItem} from '@src/redux/PortalRowItem';
import ArtItemRender from '@src/components/elements/SnapCameraAR/ArtItemRender';
import PortalItemRender from '@src/components/elements/SnapCameraAR/PortalItemRender';
import {connect} from 'react-redux';
import {RootState} from '@src/redux/useRedux';
const faker = require('@faker-js/faker');

const mapStateToProps = (state: RootState) => ({
  allArts: state.artSlice.allArts,
  selectedArt: state.artSlice.selectedArt,
  allPortals: state.portalSlice.allPortals,
  selectedPortal: state.portalSlice.selectedPortal,
});
const mapDispatchToProps = () => ({});

interface IProps {
  onInitialized: (state: any, reason: any) => void;
}
interface IState {}

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

  //ARTS
  _renderModels = () => {
    const modelItem = this.props.selectedArt as ArtRowItem;
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

  //PORTALS
  _renderPortals = () => {
    const modelItem = this.props.selectedPortal as PortalRowItem;
    if (modelItem) {
      console.log(modelItem);
      var uuid = faker.datatype.uuid();
      var itemBitMask = Math.pow(2, this.defaultBitMask);
      this.renderedObjects.push(
        <PortalItemRender
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
    let portals = this._renderPortals();
    return (
      <ViroARScene
        ref={this.arSceneRef as any}
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
        {portals}
      </ViroARScene>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(ReviewScene);
