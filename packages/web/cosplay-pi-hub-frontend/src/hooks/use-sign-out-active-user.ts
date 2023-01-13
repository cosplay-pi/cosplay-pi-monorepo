import { useSignOut } from "react-firebase-hooks/auth";

import { useFirebaseAuth } from "./use-firebase-auth";

export function useSignOutActiveUser() {

  const firebaseAuth = useFirebaseAuth();

  const [signOut] = useSignOut(firebaseAuth);

  const signOutActiveUser = async () => {

    await signOut();
  };

  return { signOutActiveUser };
}
