import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { getFirebaseAuth } from "./get-firebase-auth";

export function useSignInActiveUserWithGoogle() {

  const firebaseAuth = getFirebaseAuth();

  const [signInWithGoogle] = useSignInWithGoogle(firebaseAuth);

  const signInActiveUserWithGoogle = async () => {

    await signInWithGoogle();
  };

  return { signInActiveUserWithGoogle };
}
