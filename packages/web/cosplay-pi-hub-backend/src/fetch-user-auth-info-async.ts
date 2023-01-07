import * as FirebaseAdmin from 'firebase-admin';

import { UserAuthInfo } from './user-auth-info';
import { UserIdTokenIsNotValid } from './user-id-token-is-not-valid';

export const fetchUserAuthInfoAsync = async ({
  userIdToken,
}: {
  userIdToken: string;
}): Promise<UserAuthInfo> => {

  if (true || false) {

    return {
      id: `test-user-id`,
    };
  }

  try {

    const firebaseUserDecodedIdToken = await FirebaseAdmin.auth().verifyIdToken(userIdToken);

    return {
      id: firebaseUserDecodedIdToken.uid,
    };

  } catch {

    throw new UserIdTokenIsNotValid();
  }
};
