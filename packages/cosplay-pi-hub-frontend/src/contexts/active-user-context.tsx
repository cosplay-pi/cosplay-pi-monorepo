import * as FirebaseAuth from 'firebase/auth';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
} from "react";
import * as FirebaseAuthHooks from "react-firebase-hooks/auth";

export interface ActiveUserInfo {
  id: string;
  displayName?: string;
  email?: string;
};

export interface ActiveUserContextValue {
  activeUserInfo?: ActiveUserInfo;
  signInActiveUserWithGoogle(): Promise<void>;
  signOutActiveUser(): Promise<void>;
  fetchActiveUserIdToken(): Promise<string>;
}

const ActiveUserContext = createContext<ActiveUserContextValue | undefined>(
  undefined,
);

export function useActiveUserContext() {

  return useContext(ActiveUserContext);
}

export function useActiveUserDefinedContext() {

  const activeUserContextValue = useActiveUserContext();

  if (activeUserContextValue === undefined) {

    throw new Error();
  }

  return activeUserContextValue;
}


export function ActiveUserContextProvider(
  {
    children,
  }: {
    children: ReactNode;
  },
) {

  const firebaseAuth = FirebaseAuth.getAuth();

  const [
    firebaseAuthCurrentUser,
    isFirebaseAuthInitializing,
  ] = FirebaseAuthHooks.useAuthState(firebaseAuth);

  const [signInFirebaseAuthCurrentUserWithGoogle] =
    FirebaseAuthHooks.useSignInWithGoogle(firebaseAuth);

  const [signOutFirebaseAuthCurrentUser] =
    FirebaseAuthHooks.useSignOut(firebaseAuth);

  const activeUserInfo =
    (
      firebaseAuthCurrentUser === null
      ||
      firebaseAuthCurrentUser === undefined
    )
      ? undefined
      : {
        id: firebaseAuthCurrentUser.uid,
        displayName: firebaseAuthCurrentUser.displayName !== null
          ? firebaseAuthCurrentUser.displayName
          : undefined,
        email: firebaseAuthCurrentUser.email !== null
          ? firebaseAuthCurrentUser.email
          : undefined,
      } satisfies ActiveUserInfo;

  const signInActiveUserWithGoogle = useCallback(
    async () => {

      await signInFirebaseAuthCurrentUserWithGoogle();
    },
    [
      signOutFirebaseAuthCurrentUser,
    ],
  );

  const signOutActiveUser = useCallback(
    async () => {

      await signOutFirebaseAuthCurrentUser();
    },
    [
      signOutFirebaseAuthCurrentUser,
    ],
  );

  const fetchActiveUserIdToken = useCallback(
    async () => {

      if (
        firebaseAuthCurrentUser === null
        ||
        firebaseAuthCurrentUser === undefined
      ) {

        throw Error();
      }

      return await firebaseAuthCurrentUser.getIdToken();
    },
    [
      firebaseAuthCurrentUser,
    ],
  );

  if (isFirebaseAuthInitializing) {

    return (
      <ActiveUserContext.Provider
        children={children}
        value={undefined}
      />
    );
  }

  return (
    <ActiveUserContext.Provider
      children={children}
      value={{
        activeUserInfo,
        fetchActiveUserIdToken,
        signInActiveUserWithGoogle,
        signOutActiveUser,
      }}
    />
  );
}
