import {
  confirmDeviceSession,
  createDeviceSession,
  rejectDeviceSession,
} from 'cosplay-pi-hub-backend-client';

import { DeviceSessionInfo } from './device-session-info';
import { fetchDeviceRuntimeState } from './fetch-device-runtime-state';
import { generateDeviceSessionNonce } from './generate-device-session-nonce';
import { getDeviceId } from './get-device-id';
import { getDeviceSessionEncryptedNonce } from './get-device-session-encrypted-nonce';

export const createAndVerifyDeviceSession = async (
): Promise<{ deviceSessionInfo: DeviceSessionInfo; }> => {

  const deviceId = getDeviceId();

  const deviceSessionNonce = generateDeviceSessionNonce();

  const deviceSessionEncryptedNonce = getDeviceSessionEncryptedNonce({
    deviceSessionNonce,
  });

  const {
    deviceSessionId,
    deviceSessionAccessToken,
    deviceSessionNonce: deviceSessionNonceFromCreateDeviceSession,
  } = await createDeviceSession({
    deviceId,
    deviceSessionEncryptedNonce,
  });

  if (
    deviceSessionNonceFromCreateDeviceSession
    !==
    deviceSessionNonce
  ) {

    await rejectDeviceSession({
      deviceSessionId,
      deviceSessionAccessToken,
    });

    throw new Error();
  }

  const deviceRuntimeState = fetchDeviceRuntimeState();

  await confirmDeviceSession({
    deviceSessionId,
    deviceSessionAccessToken,
    deviceRuntimeState,
  });

  return {
    deviceSessionInfo: {
      id: deviceSessionId,
      accessToken: deviceSessionAccessToken,
    },
  };
};
