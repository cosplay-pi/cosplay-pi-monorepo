import * as crypto from 'crypto';

import {
  DeviceRuntimeState,
  RegisterUserDevice,
  UserDeviceIsAlreadyRegistered,
  UserDevicePrivateKeyIsNotValid,
} from 'cosplay-pi-hub-backend-protocol';
import { declareExp } from 'cosplay-pi-ts-core';

import { exportHubBackendFunc } from './export-hub-backend-func';
import { fetchUserAuthInfo } from './fetch-user-auth-info';
import { getDeviceId } from './get-device-id';
import { getDevicePublicKey } from './get-device-public-key';
import { prismaClient } from './prisma-client';

exportHubBackendFunc<RegisterUserDevice>(
  `register-user-device`,
  async ({
    userIdToken,
    userDeviceProfile,
    userDevicePrivateKeyKty,
    userDevicePrivateKeyN,
    userDevicePrivateKeyE,
    userDevicePrivateKeyD,
    userDevicePrivateKeyP,
    userDevicePrivateKeyQ,
    userDevicePrivateKeyDp,
    userDevicePrivateKeyDq,
    userDevicePrivateKeyQi,
  }): Promise<{ userDeviceId: string; }> => {

    const userAuthInfo = await fetchUserAuthInfo({
      userIdToken,
    });

    const userDevicePrivateKeyAsJwk = {
      kty: userDevicePrivateKeyKty,
      n: userDevicePrivateKeyN,
      e: userDevicePrivateKeyE,
      d: userDevicePrivateKeyD,
      p: userDevicePrivateKeyP,
      q: userDevicePrivateKeyQ,
      dp: userDevicePrivateKeyDp,
      dq: userDevicePrivateKeyDq,
      qi: userDevicePrivateKeyQi,
    };

    const userDevicePrivateKey = declareExp(() => {

      try {

        return crypto.createPrivateKey({
          key: userDevicePrivateKeyAsJwk,
          format: `jwk`,
        });

      } catch {

        throw new UserDevicePrivateKeyIsNotValid();
      }
    });

    const userDevicePublicKey = getDevicePublicKey({
      devicePrivateKey: userDevicePrivateKey,
    });

    const userDeviceId = getDeviceId({
      devicePublicKey: userDevicePublicKey,
    });

    const userDevicePrivateKeyAsPem = userDevicePrivateKey.export({
      type: `pkcs1`,
      format: `pem`,
    }) as string;

    const conflictingDeviceDbInfo = await prismaClient.device.findFirst({
      where: {
        id: userDeviceId,
      },
    });

    if (conflictingDeviceDbInfo !== null) {

      throw new UserDeviceIsAlreadyRegistered();
    }

    await prismaClient.device.create({
      data: {
        id: userDeviceId,
        userId: userAuthInfo.id,
        name: userDeviceProfile.name,
        description: userDeviceProfile.description,
        // @ts-ignore
        runtimeLastState: {
          modules: {},
        } satisfies DeviceRuntimeState as DeviceRuntimeState,
        privateKeyAsPem: userDevicePrivateKeyAsPem,
      },
    });

    return {
      userDeviceId,
    };
  },
);
