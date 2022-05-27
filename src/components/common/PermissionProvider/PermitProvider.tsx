import React from 'react';
import PermissionContext from '@src/context/permission-context';
import RNPermissions from 'react-native-permissions';
import {PERMISSIONS_VALUES, PERMISSION_MSG} from '@src/constants/types';
type PermitProviderProps = {
  children?: any;
};

type PermitState = {
  isPass: boolean;
  statuses: any;
};

type PermitAction =
  | {type: 'CHECK'; result: any; isPass: boolean}
  | {type: 'REQUEST'; result: any; isPass: boolean};

const initialPermitState: PermitState = {
  isPass: false,
  statuses: {},
};

const PermitReducer = (
  state: PermitState,
  action: PermitAction,
): PermitState => {
  switch (action.type) {
    case 'CHECK':
      return {
        ...state,
        statuses: action.result,
        isPass: action.isPass,
      };
    case 'REQUEST':
      return {
        ...state,
      };
    default:
      return state;
  }
};

const PermitProvider: React.FC<PermitProviderProps> = ({children}) => {
  const [state, dispatch] = React.useReducer(PermitReducer, initialPermitState);
  const {statuses, isPass} = state;
  const permitContext = React.useMemo(
    () => ({
      isPass,
      statuses,
      check: () => {
        RNPermissions.checkMultiple(PERMISSIONS_VALUES)
          .then((result) => {
            let line = 0;
            for (const [key, value] of Object.entries(result)) {
              if (value === 'granted') {
                line++;
              }
            }
            dispatch({
              type: 'CHECK',
              result: result,
              isPass: PERMISSIONS_VALUES.length === line,
            });
          })
          .catch((error) => console.warn(error));
      },
      request: (value: any) => {
        RNPermissions.request(value)
          .then(() => {
            RNPermissions.checkMultiple(PERMISSIONS_VALUES)
              .then((result) => {
                let line = 0;
                for (const [key, value] of Object.entries(result)) {
                  if (value === 'granted') {
                    line++;
                  }
                }
                dispatch({
                  type: 'CHECK',
                  result: result,
                  isPass: PERMISSIONS_VALUES.length === line,
                });
              })
              .catch((error) => console.warn(error));
          })
          .catch((error) => console.warn(error));
      },
    }),
    [statuses, isPass],
  );

  return (
    <PermissionContext.Provider value={permitContext}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermitProvider;
