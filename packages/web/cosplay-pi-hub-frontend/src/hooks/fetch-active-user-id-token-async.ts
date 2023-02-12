import { getFirebaseAuth } from './get-firebase-auth';

export async function fetchActiveUserIdTokenAsync() {

  const firebaseAuth = getFirebaseAuth();

  const firebaseAuthCurrentUser = firebaseAuth.currentUser;

  if (firebaseAuthCurrentUser === null) {

    throw Error();
  }

  return await firebaseAuthCurrentUser.getIdToken();
};
