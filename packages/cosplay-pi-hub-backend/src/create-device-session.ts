import * as crypto from 'crypto';

import {
  CreateDeviceSession,
  DeviceDoesNotExist,
} from 'cosplay-pi-hub-backend-protocol';

import { exportHubBackendFunc } from "./export-hub-backend-func";
import { generateDeviceSessionAccessToken } from './generate-device-session-access-token';
import { prismaClient } from "./prisma-client";

exportHubBackendFunc<CreateDeviceSession>(
  `create-device-session`,
  async ({
    deviceId,
    deviceSessionEncryptedNonce,
  }) => {

    const deviceDbInfo = await prismaClient.device.findFirst({
      where: {
        id: deviceId,
      },
    });

    if (
      deviceDbInfo === null
    ) {

      throw new DeviceDoesNotExist();
    }

    const devicePrivateKey = crypto.createPrivateKey({
      key: deviceDbInfo.privateKeyAsPem,
      format: `pem`,
    });

    // TODO: Catch if cannot decrypt nonce
    const deviceSessionNonceAsBytes = crypto.privateDecrypt(
      {
        key: devicePrivateKey,
      },
      Buffer.from(
        deviceSessionEncryptedNonce,
        `base64`,
      ),
    );

    const deviceSessionNonce = deviceSessionNonceAsBytes.toString(`utf-8`);

    const deviceSessionAccessToken = generateDeviceSessionAccessToken();

    const deviceSessionDbInfo = await prismaClient.deviceSession.create({
      data: {
        deviceId: deviceId,
        accessToken: deviceSessionAccessToken,
      },
    });

    const deviceSessionId = deviceSessionDbInfo.id;

    return {
      deviceSessionId,
      deviceSessionAccessToken,
      deviceSessionNonce,
    };
  },
);
