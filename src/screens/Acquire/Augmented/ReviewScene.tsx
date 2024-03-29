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
import {RootState, AppDispatch} from '@src/redux/useRedux';
import {updateCheckedArt} from '@src/redux/slices/artSlice';
const faker = require('@faker-js/faker');

const mapStateToProps = (state: RootState) => ({
  allArts: state.artSlice.allArts,
  selectedArt: state.artSlice.selectedArt,
  allPortals: state.portalSlice.allPortals,
  selectedPortal: state.portalSlice.selectedPortal,
  currentType: state.renderSlice.modelRender,
});
const mapDispatchToProps = () => ({});

interface IProps {
  onInitialized: (state: any, reason: any) => void;
  onClickState: (uuid: any, state: any, itemType: any) => void;
}
interface IState {}

class ReviewScene extends React.PureComponent<
  ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    IProps,
  IState
> {
  private arSceneRef: React.RefObject<typeof ViroARScene> =
    React.createRef<typeof ViroARScene>();
  private artObjects: any = [];
  private portalObjects: any = [];
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
    if (this.props.currentType === 'arts') {
      const modelItem = this.props.selectedArt as ArtRowItem;
      if (modelItem) {
        var uuid = faker.datatype.uuid();
        var itemBitMask = Math.pow(2, this.defaultBitMask);

        this.artObjects.push(
          <ArtItemRender
            key={uuid}
            modelIDProps={modelItem}
            bitMask={itemBitMask}
            onLoadCallback={this._onLoadCallback}
            onClickStateCallback={this.props.onClickState}
            hitTestMethod={this._onHitTestMethod}
          />,
        );
        this.defaultBitMask++;
      }
    }
    return this.artObjects;
  };

  //PORTALS
  _renderPortals = () => {
    if (this.props.currentType === 'portals') {
      const portalItem = this.props.selectedPortal as PortalRowItem;
      if (portalItem) {
        var uuid = faker.datatype.uuid();
        var itemBitMask = Math.pow(2, this.defaultBitMask);
        this.portalObjects.push(
          <PortalItemRender
            key={uuid}
            portalIDProps={portalItem}
            bitMask={itemBitMask}
            onLoadCallback={this._onLoadCallback}
            hitTestMethod={this._onHitTestMethod}
          />,
        );
        this.defaultBitMask++;
      }
    }
    return this.portalObjects;
  };

  render() {
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
        {this._renderModels()}
        {this._renderPortals()}
      </ViroARScene>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewScene);
