import {Platform} from 'react-native';

export const distanceBetweenPoints = (p1: any, p2: any) => {
  if (!p1 || !p2) {
    return 0;
  }

  var R = 6371; // Radius of the Earth in km
  var dLat = ((p2.latitude - p1.latitude) * Math.PI) / 180;
  var dLon = ((p2.longitude - p1.longitude) * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((p1.latitude * Math.PI) / 180) *
      Math.cos((p2.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

export const latLongToMerc = (latDeg: any, longDeg: any) => {
  // From: https://gist.github.com/scaraveos/5409402
  const longRad = (longDeg / 180.0) * Math.PI;
  const latRad = (latDeg / 180.0) * Math.PI;
  const smA = 6378137.0;
  const xmeters = smA * longRad;
  const ymeters = smA * Math.log((Math.sin(latRad) + 1) / Math.cos(latRad));
  return {x: xmeters, y: ymeters};
};

export const transformGpsToAR = (
  stateLat: any,
  stateLong: any,
  stateHeading: any,
  lat: any,
  lng: any,
) => {
  const isAndroid = Platform.OS === 'android';
  const latObj = lat;
  const longObj = lng;
  const latMobile = stateLat;
  const longMobile = stateLong;

  const deviceObjPoint = latLongToMerc(latObj, longObj);
  const mobilePoint = latLongToMerc(latMobile, longMobile);
  const objDeltaY = deviceObjPoint.y - mobilePoint.y;
  const objDeltaX = deviceObjPoint.x - mobilePoint.x;

  if (isAndroid) {
    let degree = stateHeading;
    let angleRadian = (degree * Math.PI) / 180;
    let newObjX =
      objDeltaX * Math.cos(angleRadian) - objDeltaY * Math.sin(angleRadian);
    let newObjY =
      objDeltaX * Math.sin(angleRadian) + objDeltaY * Math.cos(angleRadian);
    return {x: newObjX, z: -newObjY};
  }

  return {x: objDeltaX, z: -objDeltaY};
};
