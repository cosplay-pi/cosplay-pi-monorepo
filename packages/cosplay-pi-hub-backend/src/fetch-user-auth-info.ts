import * as FirebaseAdmin from 'firebase-admin';

import { UserIdTokenIsNotValid } from 'cosplay-pi-hub-backend-protocol';

import { UserAuthInfo } from './user-auth-info';

export const fetchUserAuthInfo = async ({
  userIdToken,
}: {
  userIdToken: string;
}): Promise<UserAuthInfo> => {

  try {

    const firebaseUserDecodedIdToken = await FirebaseAdmin.auth().verifyIdToken(userIdToken);

    return {
      id: firebaseUserDecodedIdToken.uid,
    };

  } catch {

    throw new UserIdTokenIsNotValid();
  }
};
