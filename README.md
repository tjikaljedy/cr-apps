### React-Native Notice

### Starting 2022-05-10

The main concern in develop in react-native is to maintain dependancy version the packages.

As following:

## Major package link with others

"react": "17.0.1",
"react-native": "^0.67.4",
"react-native-reanimated": "^2.2.4",
"react-native-safe-area-context": "^4.1.2",

## Used by

"react-native-vision-camera": "^2.13.0"
"react-native-maps": "^0.30.1",

## Instruction

Run instructions for Android:
• Have an Android emulator running (quickest way to get started), or a device connected.
• cd "/Users/tjikaljedy/Workspace/crazyrich/frontend/MyApp3" && npx react-native run-android

Run instructions for iOS:
• cd "/Users/tjikaljedy/Workspace/crazyrich/frontend/MyApp3" && npx react-native run-ios - or -
• Open MyApp3/ios/MyApp3.xcworkspace in Xcode or run "xed -b ios"
• Hit the Run button

Run instructions for macOS:
• See https://aka.ms/ReactNativeGuideMacOS for the latest up-to-date instructions.

## Source

https://github.com/waseem-mansha-gondal/react-native-starter-boilerplate
https://github.com/Global-Software-Consulting/react-native-boilerplate/tree/main/app/store/actions
https://github.com/Global-Software-Consulting/react-native-music-app-starter

https://github.com/JericoK/xtendly-prosperna-react-native-boilerplate/tree/main/template/src

https://github.com/PSPatel5/react-native-boilerplate

## Others

"@viro-community/react-viro": "file:../rn-repo/@viro-community/react-viro/viro-community-react-viro-2.23.0.tgz",

- source={{
                 uri: `https://crazyrich-app.herokuapp.com/art/icecreamman_anim/icecreamman_anim_pbr.vrx`,
                 headers: {
                   'content-type': 'application/octet-stream',
                 },
               }}
  position={[0, -2, -2]}

  ## Viro
  Render models added to the scene.
  modelItems - list of models added by user; comes from redux, see js/redux/reducers/arobjects.js
  startingBitMask - used for adding shadows for each of the, for each new object added to the scene,
  pass a bitMask as {Math.pow(2,objBitMask)}. This is done since each object has it's own
  spotlight and a corresponding shadow plane. So each new set of these components are assigned a
  consistent bitMask that's used in SpotLight's "influenceBitMask",
  Viro3DObject's "shadowCastingBitMask" and "lightReceivingBitMask" and Shadow plane (ViroQuad)'s "lightReceivingBitMask"
