import { useFirebaseAuthState } from "../contexts/firebase-auth-state-context";

export function useActiveUserInfo() {

  const { firebaseAuthState } = useFirebaseAuthState();

  if (firebaseAuthState.isInitializing) {

    throw new Error();
  }

  if (firebaseAuthState.currentUser === undefined) {

    return {};
  }

  const activeUserInfo = {
    id: firebaseAuthState.currentUser.uid,
    email: firebaseAuthState.currentUser.email === null
      ? undefined
      : firebaseAuthState.currentUser.email,
    displayName: firebaseAuthState.currentUser.displayName === null
      ? undefined
      : firebaseAuthState.currentUser.displayName,
  };

  return { activeUserInfo };
};
