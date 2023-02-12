import { useSignOut } from "react-firebase-hooks/auth";

import { getFirebaseAuth } from "./get-firebase-auth";

export function useSignOutActiveUser() {

  const firebaseAuth = getFirebaseAuth();

  const [signOut] = useSignOut(firebaseAuth);

  const signOutActiveUser = async () => {

    await signOut();
  };

  return { signOutActiveUser };
}
