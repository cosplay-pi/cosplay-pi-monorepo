import * as FirebaseAuth from 'firebase/auth';

export function useFirebaseAuth() {

  return FirebaseAuth.getAuth();
}
