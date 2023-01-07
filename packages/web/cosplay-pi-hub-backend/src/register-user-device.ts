import * as crypto from 'crypto';

import { $declareExp } from 'cosplay-pi-ts-core';

import { $exportHubBackendFunc } from './$export-hub-backend-func';
import { fetchUserAuthInfoAsync } from './fetch-user-auth-info-async';
import { getDeviceId } from './get-device-id';
import { getDevicePublicKey } from './get-device-public-key';
import { prismaClient } from './prisma-client';
import { UserDeviceIsAlreadyRegistered } from './user-device-is-already-registered';
import { UserDevicePrivateKeyIsNotValid } from './user-device-private-key-is-not-valid';

$exportHubBackendFunc(
  `register-user-device`,
  async ({
    userIdToken,
    userDevicePrivateKeyKty,
    userDevicePrivateKeyN,
    userDevicePrivateKeyE,
    userDevicePrivateKeyD,
    userDevicePrivateKeyP,
    userDevicePrivateKeyQ,
    userDevicePrivateKeyDp,
    userDevicePrivateKeyDq,
    userDevicePrivateKeyQi,
  }: {
    userIdToken: string;
    userDevicePrivateKeyKty: string;
    userDevicePrivateKeyN: string;
    userDevicePrivateKeyE: string;
    userDevicePrivateKeyD: string;
    userDevicePrivateKeyP: string;
    userDevicePrivateKeyQ: string;
    userDevicePrivateKeyDp: string;
    userDevicePrivateKeyDq: string;
    userDevicePrivateKeyQi: string;
  }): Promise<{ userDeviceId: string; }> => {

    const userAuthInfo = await fetchUserAuthInfoAsync({
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

    const userDevicePrivateKey = $declareExp(() => {

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
        privateKeyAsPem: userDevicePrivateKeyAsPem,
      },
    });

    return {
      userDeviceId,
    };
  },
);
