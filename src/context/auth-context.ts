import * as React from 'react';

type AuthState = {
  userToken: string | null;
  signIn: () => void;
  signOut: () => void;
  signUp: () => void;
};

const initialAuthState: AuthState = {
  userToken: null,
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
};

const AuthContext = React.createContext(initialAuthState);

export default AuthContext;
