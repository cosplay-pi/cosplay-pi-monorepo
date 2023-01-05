import fetch from 'node-fetch';

import { DeviceSessionInfo } from './device-session-info';
import { generateDeviceSessionNonce } from './generate-device-session-nonce';
import { getDeviceId } from './get-device-id';
import { getDeviceSessionEncryptedNonce } from './get-device-session-encrypted-nonce';
import { getHubBackendUrl } from './get-hub-backend-url';

export const createAndVerifyDeviceSessionAsync = async (
): Promise<{ deviceSessionInfo: DeviceSessionInfo; }> => {

  const deviceId = getDeviceId();

  const deviceSessionNonce = generateDeviceSessionNonce();

  const deviceSessionEncryptedNonce = getDeviceSessionEncryptedNonce({
    deviceSessionNonce,
  });

  const hubBackendUrl = getHubBackendUrl();

  const createRequestUrl = new URL(hubBackendUrl);
  createRequestUrl.pathname = `/create-device-session`;
  createRequestUrl.searchParams.append(
    `deviceId`,
    deviceId,
  );
  createRequestUrl.searchParams.append(
    `deviceSessionEncryptedNonce`,
    deviceSessionEncryptedNonce
  );

  const createRequestResponse = await fetch(createRequestUrl.href);

  const createRequestResponseBody = await createRequestResponse.json();

  if (createRequestResponse.status !== 200) {

    throw new Error(createRequestResponseBody);
  }

  const createRequestSuccessResponseBody =
    createRequestResponseBody as {
      deviceSessionId: string;
      deviceSessionAccessToken: string;
      deviceSessionNonce: string;
    };

  const deviceSessionInfo = {
    id: createRequestSuccessResponseBody.deviceSessionId,
    accessToken: createRequestSuccessResponseBody.deviceSessionAccessToken,
  };

  if (
    createRequestSuccessResponseBody.deviceSessionNonce
    !==
    deviceSessionNonce
  ) {

    const rejectRequestUrl = new URL(hubBackendUrl);
    rejectRequestUrl.pathname = `/reject-device-session`;
    rejectRequestUrl.searchParams.append(
      `deviceSessionId`,
      deviceSessionInfo.id,
    );
    rejectRequestUrl.searchParams.append(
      `deviceSessionAccessToken`,
      deviceSessionInfo.accessToken,
    );

    await fetch(rejectRequestUrl.href);
    
    throw new Error();
  }

  const conirmRequestUrl = new URL(hubBackendUrl);
  conirmRequestUrl.pathname = `/confirm-device-session`;
  conirmRequestUrl.searchParams.append(
    `deviceSessionId`,
    deviceSessionInfo.id,
  );
  conirmRequestUrl.searchParams.append(
    `deviceSessionAccessToken`,
    deviceSessionInfo.accessToken,
  );

  const confirmRequestResponse = await fetch(conirmRequestUrl.href);

  const confirmRequestResponseBody = await confirmRequestResponse.json();

  if (confirmRequestResponse.status !== 200) {

    throw new Error(confirmRequestResponseBody);
  }

  return {
    deviceSessionInfo,
  };
};
