import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { useFirebaseAuth } from "./use-firebase-auth";

export function useSignInActiveUserWithGoogle() {

  const firebaseAuth = useFirebaseAuth();

  const [signInWithGoogle] = useSignInWithGoogle(firebaseAuth);

  const signInActiveUserWithGoogle = async () => {

    await signInWithGoogle();
  };

  return { signInActiveUserWithGoogle };
}
