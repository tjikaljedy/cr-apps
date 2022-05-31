import * as React from 'react';
import {
  Viro3DObject,
  ViroNode,
  Viro360Image,
  Viro360Video,
  ViroVideo,
  ViroImage,
  ViroSphere,
  ViroSpotLight,
  ViroPortalScene,
  ViroPortal,
} from '@viro-community/react-viro';
import {
  PortalRowItem,
  LOADING,
  LOADED,
  PS_TYPE_360_VIDEO,
} from '../../../redux/PortalRowItem';

const faker = require('@faker-js/faker');
interface IProps {
  modelIDProps: PortalRowItem;
  bitMask: number;
  onLoadCallback: (uuid: any, state: any) => void;
  onClickStateCallback?: () => void;
  hitTestMethod: (callback: any) => void;
}
interface IState {
  position: any;
  rotation: any;
  scale: any;
  nodeIsVisible: boolean;
  shouldBillboard: boolean;
  insidePortal: boolean;
  itemClickedDown: boolean;
}

export default class PortalItemRender extends React.PureComponent<
  IProps,
  IState
> {
  state: IState = {
    position: [0, -10, -1],
    rotation: [0, 0, 0],
    scale: this.props.modelIDProps?.scale,
    nodeIsVisible: false,
    shouldBillboard: true,
    insidePortal: true,
    itemClickedDown: false,
  };
  private arNodeRef: React.RefObject<typeof ViroNode> = React.createRef();
  private arSpotRef: React.RefObject<typeof ViroSpotLight> = React.createRef();

  _onDrag = (dragToPos: any, source: any) => {
    //
  };

  _onItemClicked = (position: any, source: any) => {
    console.log(this.state.rotation);
  };

  _isVideo = (videoUri: any) => {
    return (
      videoUri.toLowerCase().endsWith('mov') ||
      videoUri.toLowerCase().endsWith('mp4')
    );
  };

  _is360Photo = (source: any, width: number, height: number) => {
    let ratio = width / height;
    return ratio > 1.9 && ratio < 2.2;
  };

  _onRotate = (rotateState: any, rotationFactor: number, source: any) => {
    if (rotateState == 3) {
      this.state.rotation = [
        this.state.rotation[0],
        this.state.rotation[1] + rotationFactor,
        this.state.rotation[2],
      ];
      /*this.setState({
        rotation: [
          this.state.rotation[0],
          this.state.rotation[1] + rotationFactor,
          this.state.rotation[2],
        ],
      });*/
      return;
    }
    this.arNodeRef.current.setNativeProps({
      rotation: [
        this.state.rotation[0],
        this.state.rotation[1] + rotationFactor,
        this.state.rotation[2],
      ],
    });
  };

  _onPinch = (pinchState: any, scaleFactor: number, source: any) => {
    var newScale = this.state.scale.map((x: number) => {
      return x * scaleFactor;
    });
    if (pinchState == 3) {
      this.state.scale = newScale;
      //this.setState({
      //  scale: newScale,
      //});
      return;
    }
    this.arNodeRef.current.setNativeProps({scale: newScale});
    //this.spotLight.setNativeProps({shadowFarZ: 6 * newScale[0]});
  };

  _onError = (uuid: any) => {
    //
  };

  _onObjectLoadStart = (uuid: any) => {
    return () => {
      this.props.onLoadCallback(uuid, LOADING);
    };
  };

  _onObjectLoadEnd = (uuid: any) => {
    return () => {
      this.props.onLoadCallback(uuid, LOADED);
      if (!this.state.nodeIsVisible) {
        //this.setState({
        //  nodeIsVisible: true,
        //});
        this.props.hitTestMethod(this._onARHitTestResults);
      }
    };
  };

  _onARHitTestResults = (position: any, forward: any, results: any) => {
    let scaledForwardVector = [
      forward[0] * 1.2,
      forward[1] * 1.2,
      forward[2] * 1.2,
    ];
    let newPosition = [
      position[0] + scaledForwardVector[0],
      position[1] + scaledForwardVector[1],
      position[2] + scaledForwardVector[2],
    ];

    this._setInitialPlacement(newPosition);
  };

  _onPortalEnter = () => {
    this.state.insidePortal = true;
    //this.setState({
    //  insidePortal:true,
    //});
  };

  _onPortalExit = () => {
    this.state.insidePortal = false;
    //this.setState({
    //  insidePortal:false,
    //});
  };

  _setInitialPlacement = (position: any) => {
    this.setState({
      position: position,
    });
    setTimeout(() => {
      this._updateInitialRotation();
    }, 20);
  };

  _updateInitialRotation = () => {
    this.arNodeRef.current.getTransformAsync().then((retDict: any) => {
      let rotation = retDict.rotation;
      let absX = Math.abs(rotation[0]);
      let absZ = Math.abs(rotation[2]);

      let yRotation = rotation[1];

      // if the X and Z aren't 0, then adjust the y rotation.
      if (absX > 1 && absZ > 1) {
        yRotation = 180 - yRotation;
      }
      this.setState({
        rotation: [0, yRotation, 0],
        shouldBillboard: false,
        nodeIsVisible: true,
      });
    });
  };

  _renderPortalInside(modelItem: PortalRowItem) {
    var uuid = faker.datatype.uuid();
    var portalSource: any =
      this.props.modelIDProps.portal360Image != undefined &&
      this.props.modelIDProps.portal360Image != null
        ? this.props.modelIDProps.portal360Image
        : modelItem.portal360Image;
    if (
      this._is360Photo(portalSource, portalSource.width, portalSource.height)
    ) {
      if (portalSource.type == PS_TYPE_360_VIDEO) {
        return (
          <Viro360Video
            key={`dt1-${uuid}`}
            muted={!this.state.insidePortal}
            volume={1.0}
            source={portalSource.source}
            loop={true}
          />
        );
      } else {
        return (
          <Viro360Image key={`dt2-${uuid}`} source={portalSource.source} />
        );
      }
    } else {
      var viewArray = [];
      if (this._isVideo(portalSource.source.uri)) {
        viewArray.push(
          <ViroSphere
            position={[0, 0, 0]}
            radius={56}
            facesOutward={false}
            key={`dt3-${uuid}`}
            materials="theatre"
          />,
        );
        viewArray.push(
          <ViroVideo
            key={`dt4-${uuid}`}
            width={1}
            height={1}
            source={portalSource.source}
            position={[0, 3.9, -39]}
            scale={[42, 21, 1]}
          />,
        );
      } else {
        viewArray.push(
          <ViroSpotLight
            key={`dt5-${uuid}`}
            innerAngle={5}
            outerAngle={20}
            direction={[0, -1, 0]}
            position={[0, 6, 0]}
            color="#ffffff"
            castShadows={true}
            shadowNearZ={0.1}
            shadowFarZ={5}
            shadowOpacity={0.9}
          />,
        );
        viewArray.push(
          <Viro3DObject
            key={`dt6-${uuid}`}
            position={[0, -2, -6]}
            scale={[0.5, 0.5, 0.5]}
            source={require('@src/assets/portals/gallery/artgallery3.vrx')}
            resources={[
              require('@src/assets/portals/gallery_projector_diffuse.png'),
              require('@src/assets/portals/gallery_projector_specular.png'),
              require('@src/assets/portals/gallery_walls_diffuse.png'),
              require('@src/assets/portals/gallery_walls_specular.png'),
            ]}
            type="VRX"
          />,
        );

        viewArray.push(
          <ViroImage
            key={`dt7-${uuid}`}
            width={2}
            height={4}
            resizeMode="ScaleToFill"
            imageClipMode="None"
            source={portalSource.source}
            position={[0, 0.8, -5.8]}
            scale={[1, 1, 1]}
          />,
        );
        viewArray.push(
          <Viro360Image
            key={`dt8-${uuid}`}
            source={require('@src/assets/portals/360_waikki.jpg')}
          />,
        );
      }
      return viewArray;
    }
  }

  render() {
    var modelItem = this.props.modelIDProps as PortalRowItem;
    var uuid = faker.datatype.uuid();
    return (
      <ViroNode
        key={uuid}
        ref={this.arNodeRef}
        visible={this.state.nodeIsVisible}
        position={this.state.position}
        scale={this.state.scale}
        rotation={this.state.rotation}
        onDrag={() => {}}>
        <ViroSpotLight
          key={`vs-${uuid}`}
          ref={this.arSpotRef}
          innerAngle={5}
          outerAngle={20}
          attenuationStartDistance={0.1}
          attenuationEndDistance={22}
          direction={[0, -1, 0]}
          position={[0, 5, 1]}
          color="#ffffff"
          castsShadow={true}
          influenceBitMask={this.props.bitMask}
          shadowNearZ={0.1}
          shadowFarZ={5}
          shadowOpacity={0.9}
        />

        <ViroPortalScene
          key={`vps-${uuid}`}
          position={modelItem.position}
          onRotate={this._onRotate}
          onPinch={this._onPinch}
          passable={true}
          scale={modelItem.portalScale}
          onClickState={() => {}}
          onPortalEnter={this._onPortalEnter}
          onPortalExit={this._onPortalExit}>
          <ViroPortal key={`vpr-${uuid}`}>
            <Viro3DObject
              key={`vo-${uuid}`}
              lightReceivingBitMask={this.props.bitMask | 1}
              shadowCastingBitMask={this.props.bitMask}
              type={modelItem.frameType as any}
              source={modelItem.obj as any}
              resources={modelItem.resources}
              onLoadStart={this._onObjectLoadStart(uuid)}
              onLoadEnd={this._onObjectLoadEnd(uuid)}
            />
          </ViroPortal>
        </ViroPortalScene>
      </ViroNode>
    );
  }
}
