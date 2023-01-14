import * as FirebaseAuth from 'firebase/auth';

export const fetchActiveUserIdTokenAsync = async () => {

  const firebaseAuth = FirebaseAuth.getAuth();

  const firebaseUser = firebaseAuth.currentUser;

  if (firebaseUser === null) {

    throw Error();
  }

  return await firebaseUser.getIdToken();
};
