import * as React from 'react';

type PermissionState = {
  statuses: any;
  isPass: boolean;
  check: () => void;
  request: (value: any) => void;
};

const initialPermissionState: PermissionState = {
  statuses: {},
  isPass: false,
  check: () => {},
  request: () => {},
};

const PermissionContext = React.createContext(initialPermissionState);

export default PermissionContext;
