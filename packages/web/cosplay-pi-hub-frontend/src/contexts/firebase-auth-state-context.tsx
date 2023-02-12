import * as FirebaseAuth from 'firebase/auth';
import {
  ReactNode,
  createContext,
  useContext,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { getFirebaseAuth } from '../hooks/get-firebase-auth';

export interface FirebaseAuthState {
  currentUser: FirebaseAuth.User | undefined;
  isInitializing: boolean;
}

const FirebaseAuthStateContext = createContext<{
  firebaseAuthState: FirebaseAuthState;
}>({
  firebaseAuthState: {
    currentUser: undefined,
    isInitializing: true,
  },
});

export function useFirebaseAuthState() {

  return useContext(FirebaseAuthStateContext);
}

export function FirebaseAuthStateProvider(
  {
    children,
  }:
    {
      children: ReactNode;
    }
) {

  const firebaseAuth = getFirebaseAuth();

  const [
    firebaseAuthCurrentUser,
    isFirebaseAuthInitializing,
  ] = useAuthState(firebaseAuth);

  const firebaseAuthState = {
    currentUser: firebaseAuthCurrentUser !== null
      ? firebaseAuthCurrentUser
      : undefined,
    isInitializing: isFirebaseAuthInitializing,
  };

  return (
    <FirebaseAuthStateContext.Provider
      children={children}
      value={{
        firebaseAuthState,
      }}
    />
  );
}
