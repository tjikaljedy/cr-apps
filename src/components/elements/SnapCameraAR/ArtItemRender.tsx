import * as React from 'react';
import {
  Viro3DObject,
  ViroMaterials,
  ViroNode,
  ViroQuad,
  ViroSpotLight,
} from '@viro-community/react-viro';
import {ArtRowItem, LOADING, LOADED, ROW_TYPE} from '../../../redux/ArtRowItem';

const faker = require('@faker-js/faker');
interface IProps {
  modelIDProps?: ArtRowItem;
  bitMask: number;
  onLoadCallback: (uuid: any, state: any) => void;
  onClickStateCallback: (uuid: any, state: any, itemType: any) => void;
  hitTestMethod: (callback: any) => void;
}
interface IState {
  position: any;
  rotation: any;
  scale: any;
  nodeIsVisible: boolean;
  shouldBillboard: boolean;
  runAnimation: boolean;
  showParticles: boolean;
  itemClickedDown: boolean;
}

export default class ArtItemRender extends React.PureComponent<IProps, IState> {
  state: IState = {
    position: [0, -10, -1],
    rotation: [0, 0, 0],
    scale: this.props.modelIDProps?.scale,
    nodeIsVisible: false,
    shouldBillboard: true,
    runAnimation: true,
    showParticles: true,
    itemClickedDown: false,
  };
  private arNodeRef: React.RefObject<typeof ViroNode> =
    React.createRef<typeof ViroNode>();
  private arSpotRef: React.RefObject<typeof ViroSpotLight> =
    React.createRef<typeof ViroSpotLight>();

  _onDrag = (dragToPos: any, source: any) => {
    // this.setState({lastPosition: [dragToPos[0], dragToPos[1], dragToPos[2]]});
  };

  _onClickState = (uuid: any) => {
    return (clickState: any, position: any, source: any) => {
      if (clickState == 1) {
        this.state.itemClickedDown = true;
        setTimeout(() => {
          this.state.itemClickedDown = false;
        }, 200);
      }

      if (clickState == 2) {
        if (this.state.itemClickedDown) {
          this._onItemClicked();
        }
        this.props.onClickStateCallback(uuid, clickState, ROW_TYPE);
      }
    };
  };

  _onItemClicked = () => {
    this.state.runAnimation = !this.state.runAnimation;
    this.state.showParticles = !this.state.showParticles;
    this.state.itemClickedDown = false;
  };

  _onPinch = (uuid: any) => {
    return (pinchState: any, scaleFactor: number, source: any) => {
      var newScale = this.state.scale.map((x: number) => {
        return x * scaleFactor;
      });
      if (pinchState == 3) {
        this.state.scale = newScale;
        this.props.onClickStateCallback(uuid, pinchState, ROW_TYPE);
        return;
      }
      this.arNodeRef.current.setNativeProps({scale: newScale});
      //this.spotLight.setNativeProps({shadowFarZ: 6 * newScale[0]});
    };
  };

  _onRotate = (uuid: any) => {
    return (rotateState: any, rotationFactor: number, source: any) => {
      if (rotateState == 3) {
        this.state.rotation = [
          this.state.rotation[0],
          this.state.rotation[1] + rotationFactor,
          this.state.rotation[2],
        ];
        this.props.onClickStateCallback(uuid, rotateState, ROW_TYPE);
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
  };

  _distance = (vectorOne: any, vectorTwo: any) => {
    const distanceData = Math.sqrt(
      (vectorTwo[0] - vectorOne[0]) * (vectorTwo[0] - vectorOne[0]) +
        (vectorTwo[1] - vectorOne[1]) * (vectorTwo[1] - vectorOne[1]) +
        (vectorTwo[2] - vectorOne[2]) * (vectorTwo[2] - vectorOne[2]),
    );
    return distanceData;
  };

  _onARHitTestResults = (position: any, forward: any, results: any) => {
    let newPosition = [forward[0] * 1.5, forward[1] * 1.5, forward[2] * 1.5];
    let hitResultPosition;

    if (results.length > 0) {
      for (let i = 0; i < results.length; i += 1) {
        const result = results[i];
        if (result.type === 'ExistingPlaneUsingExtent') {
          const distanceData = Math.sqrt(
            (result.transform.position[0] - position[0]) *
              (result.transform.position[0] - position[0]) +
              (result.transform.position[1] - position[1]) *
                (result.transform.position[1] - position[1]) +
              (result.transform.position[2] - position[2]) *
                (result.transform.position[2] - position[2]),
          );
          if (distanceData > 0.2 && distanceData < 10) {
            hitResultPosition = result.transform.position;
            break;
          }
        } else if (result.type === 'FeaturePoint' && !hitResultPosition) {
          const distanceData = this._distance(
            position,
            result.transform.position,
          );
          if (distanceData > 0.2 && distanceData < 10) {
            hitResultPosition = result.transform.position;
          }
        }
      }
    }

    if (hitResultPosition) {
      newPosition = hitResultPosition;
    }

    // Set the initial placement of the object using new position from the hit test.
    this._setInitialPlacement(newPosition);
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

  _onObjectLoadStart = (uuid: any) => {
    return () => {
      this.props.onLoadCallback(uuid, LOADING);
    };
  };

  _onObjectLoadEnd = (uuid: any) => {
    return () => {
      this.props.onLoadCallback(uuid, LOADED);
      //by Tjikal
      if (!this.state.nodeIsVisible) {
        //this.setState({
        // nodeIsVisible: true,
        //});
        this.props.hitTestMethod(this._onARHitTestResults);
      }
    };
  };

  render() {
    var modelItem = this.props.modelIDProps as ArtRowItem;
    var uuid = modelItem.id; //faker.datatype.uuid();
    const transformBehaviors: any = {};
    if (this.state.shouldBillboard) {
      transformBehaviors.transformBehaviors = this.state.shouldBillboard
        ? 'billboardY'
        : [];
    }
    return (
      <ViroNode
        {...transformBehaviors}
        key={`ms1-${uuid}`}
        ref={this.arNodeRef}
        visible={this.state.nodeIsVisible}
        position={this.state.position}
        scale={this.state.scale}
        rotation={this.state.rotation}
        onDrag={() => {}}
        dragType="FixedToWorld">
        <ViroSpotLight
          key={`ms2-${uuid}`}
          ref={this.arSpotRef}
          intensity={modelItem.lighting_mode == 'IBL' ? 100 : 1000}
          innerAngle={5}
          outerAngle={20}
          attenuationStartDistance={0.1}
          attenuationEndDistance={22}
          direction={[0, -1, 0]}
          position={[
            modelItem.spotlight_position_x == undefined
              ? 0
              : modelItem.spotlight_position_x,
            modelItem.spotlight_position_y == undefined
              ? 6
              : modelItem.spotlight_position_y,
            modelItem.spotlight_position_z == undefined
              ? 0
              : modelItem.spotlight_position_z,
          ]}
          color="#ffffff"
          castsShadow={true}
          influenceBitMask={this.props.bitMask}
          shadowNearZ={0.1}
          shadowFarZ={
            modelItem.shadowfarz == undefined ? 6 : modelItem.shadowfarz * 0
          }
          shadowOpacity={0.9}
        />

        <ViroNode key={`ms3-${uuid}`} position={modelItem.position as any}>
          <Viro3DObject
            key={`ms4-${uuid}`}
            animation={{...modelItem.animation, run: true}}
            lightReceivingBitMask={this.props.bitMask | 1}
            shadowCastingBitMask={this.props.bitMask}
            type={modelItem.type as any}
            materials={'pbr'}
            source={modelItem.obj as any}
            resources={modelItem.resources}
            onClickState={this._onClickState(uuid)}
            onClick={() => {}}
            onError={() => {}}
            onRotate={this._onRotate(uuid)}
            onPinch={this._onPinch(uuid)}
            onLoadStart={this._onObjectLoadStart(uuid)}
            onLoadEnd={this._onObjectLoadEnd(uuid)}
          />
        </ViroNode>
        <ViroQuad
          key={`ms5-${uuid}`}
          rotation={[-90, 0, 0]}
          position={[0, -0.001, 0]}
          width={
            modelItem.shadow_width == undefined ? 2.5 : modelItem.shadow_width
          }
          height={
            modelItem.shadow_height == undefined ? 2.5 : modelItem.shadow_height
          }
          lightReceivingBitMask={this.props.bitMask | 1}
          arShadowReceiver={true}
          ignoreEventHandling={true}
        />
      </ViroNode>
    );
  }
}

ViroMaterials.createMaterials({
  pbr: {
    lightingModel: 'PBR',
  },
});
