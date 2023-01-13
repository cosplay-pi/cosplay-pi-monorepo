import { useAuthState } from "react-firebase-hooks/auth";

import { useFirebaseAuth } from "./use-firebase-auth";

export function useActiveUserInfo() {

  const firebaseAuth = useFirebaseAuth();

  const [firebaseUser] = useAuthState(firebaseAuth);

  if (firebaseUser === null || firebaseUser === undefined) {

    return {};
  }

  const activeUserInfo = {
    id: firebaseUser.uid,
    email: firebaseUser.email === null
      ? undefined
      : firebaseUser.email,
    displayName: firebaseUser.displayName === null
      ? undefined
      : firebaseUser.displayName,
  };

  return { activeUserInfo };
};
