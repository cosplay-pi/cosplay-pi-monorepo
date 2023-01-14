import {
  confirmDeviceSessionAsync,
  createDeviceSessionAsync,
  rejectDeviceSessionAsync,
} from 'cosplay-pi-hub-backend-client';

import { DeviceSessionInfo } from './device-session-info';
import { generateDeviceSessionNonce } from './generate-device-session-nonce';
import { getDeviceId } from './get-device-id';
import { getDeviceSessionEncryptedNonce } from './get-device-session-encrypted-nonce';

export const createAndVerifyDeviceSessionAsync = async (
): Promise<{ deviceSessionInfo: DeviceSessionInfo; }> => {

  const deviceId = getDeviceId();

  const deviceSessionNonce = generateDeviceSessionNonce();

  const deviceSessionEncryptedNonce = getDeviceSessionEncryptedNonce({
    deviceSessionNonce,
  });

  const {
    deviceSessionId,
    deviceSessionAccessToken,
    deviceSessionNonce: deviceSessionNonceFromCreateDeviceSessionAsync,
  } = await createDeviceSessionAsync({
    deviceId,
    deviceSessionEncryptedNonce,
  });

  if (
    deviceSessionNonceFromCreateDeviceSessionAsync
    !==
    deviceSessionNonce
  ) {

    await rejectDeviceSessionAsync({
      deviceSessionId,
      deviceSessionAccessToken,
    });

    throw new Error();
  }

  await confirmDeviceSessionAsync({
    deviceSessionId,
    deviceSessionAccessToken,
  });

  return {
    deviceSessionInfo: {
      id: deviceSessionId,
      accessToken: deviceSessionAccessToken,
    },
  };
};
