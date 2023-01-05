import * as express from 'express';
import * as crypto from 'crypto';
import * as path from 'path';
import * as fs from 'fs';
import * as firebaseAdmin from 'firebase-admin';

import { DeviceSessionCommandStatus, DeviceSessionStatus, PrismaClient } from '@prisma/client';

import {
  DeviceCommandInfo,
} from 'cosplay-pi-device-hub-client-protocol';

const prisma = new PrismaClient();

const firebaseAdminKey = JSON.parse(
  fs.readFileSync(
    path.resolve(
      `../../../obj/cosplay-pi-hub-backend-firebase-admin-key.json`,
    ),
    `utf8`,
  ),
);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseAdminKey),
});

const prisma = new PrismaClient();

const firebaseAdminKey = JSON.parse(
  fs.readFileSync(
    path.resolve(
      `../../../obj/costume-chip-hub-backend-firebase-admin-key.json`,
    ),
    `utf8`,
  ),
);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseAdminKey),
});

const app = express();

const getDevicePublicKey = ({
  devicePrivateKey,
}: {
  devicePrivateKey: crypto.KeyObject;
}) => {

  return crypto.createPublicKey(devicePrivateKey);
};

const getDeviceId = ({
  devicePublicKey,
}: {
  devicePublicKey: crypto.KeyObject;
}) => {

  const devicePublicKeyAsDer = devicePublicKey.export({
    type: `spki`,
    format: `der`,
  });

  return crypto.createHash(`md5`).update(devicePublicKeyAsDer).digest(`hex`);
};

const generateDeviceSessionAccessToken = () => {

  return crypto.randomBytes(32).toString(`base64url`);
};

app.get(
  `/register-user-device`,
  async (request, response) => {

    const userIdToken = request.query[`userIdToken`] as string;
    const userDevicePrivateKeyKty = request.query[`userDevicePrivateKeyKty`] as string;
    const userDevicePrivateKeyN = request.query[`userDevicePrivateKeyN`] as string;
    const userDevicePrivateKeyE = request.query[`userDevicePrivateKeyE`] as string;
    const userDevicePrivateKeyD = request.query[`userDevicePrivateKeyD`] as string;
    const userDevicePrivateKeyP = request.query[`userDevicePrivateKeyP`] as string;
    const userDevicePrivateKeyQ = request.query[`userDevicePrivateKeyQ`] as string;
    const userDevicePrivateKeyDp = request.query[`userDevicePrivateKeyDp`] as string;
    const userDevicePrivateKeyDq = request.query[`userDevicePrivateKeyDq`] as string;
    const userDevicePrivateKeyQi = request.query[`userDevicePrivateKeyQi`] as string;

    console.log(userIdToken);

    const userId = `testuser`;

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

    // TODO: Catch if private key is invalid
    const userDevicePrivateKey = crypto.createPrivateKey({
      key: userDevicePrivateKeyAsJwk,
      format: `jwk`,
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

    const conflictingDeviceDbInfo = await prisma.device.findFirst({
      where: {
        id: userDeviceId,
      },
    });

    if (conflictingDeviceDbInfo !== null) {

      response.status(400);
      response.json(`user_device_is_already_registered`);
      return;
    }

    await prisma.device.create({
      data: {
        id: userDeviceId,
        userId: userId,
        privateKeyAsPem: userDevicePrivateKeyAsPem,
      },
    });

    response.json({
      userDeviceId,
    });
  },
);

app.get(
  `/fetch-user-devices-info`,
  async (request, response) => {

    const userIdToken = request.query[`userIdToken`] as string;

    console.log(userIdToken);

    const userId = `testuser`;

    const userDevicesDbInfo = await prisma.device.findMany({
      where: {
        userId: userId,
      },
    });

    const userDevicesInfo: {
      [userDeviceId: string]: {},
    } = {};

    for (const userDeviceDbInfo of userDevicesDbInfo) {

      userDevicesInfo[userDeviceDbInfo.id] = {};
    }

    response.json(
      userDevicesInfo,
    );
  },
);

app.get(
  `/fetch-device-active-session-id`,
  async (request, response) => {

    const userIdToken = request.query[`userIdToken`] as string;
    const deviceId = request.query[`deviceId`] as string;

    console.log(userIdToken);

    const userId = `testuser`;

    const deviceDbInfo = await prisma.device.findFirst({
      where: {
        id: deviceId,
      },
    });

    if (deviceDbInfo === null) {

      response.statusCode = 400;
      response.json(`device_does_not_exist`);
      return;
    }

    if (deviceDbInfo.userId !== userId) {

      response.statusCode = 400;
      response.json(`device_does_not_exist`);
      return;
    }

    response.json(deviceDbInfo.activeSessionId);
  },
);

app.get(
  `/fetch-device-session-state`,
  async (request, response) => {

    const userIdToken = request.query[`userIdToken`] as string;
    const deviceSessionId = request.query[`deviceSessionId`] as string;

    console.log(userIdToken);

    const userId = `testuser`;

    const deviceSessionDbInfo = await prisma.deviceSession.findFirst({
      where: {
        id: deviceSessionId,
      },
      include: {
        device: true,
      },
    });

    if (deviceSessionDbInfo === null) {

      response.statusCode = 400;
      response.json(`device_session_does_not_exist`);
      return;
    }

    if (deviceSessionDbInfo.device.userId !== userId) {

      response.statusCode = 400;
      response.json(`device_session_does_not_exist`);
      return;
    }

    if (deviceSessionDbInfo.status !== DeviceSessionStatus.Confirmed) {

      response.statusCode = 400;
      response.json(`device_session_is_not_confirmed`);
      return;
    }

    if (deviceSessionDbInfo.stateAsJson === null) {

      response.json(null);
      return;
    }

    response.json(
      JSON.parse(deviceSessionDbInfo.stateAsJson),
    );
  },
);

app.get(
  `/push-device-session-command`,
  async (request, response) => {

    const userIdToken = request.query[`userIdToken`] as string;
    const deviceSessionId = request.query[`deviceSessionId`] as string;
    const deviceSessionCommandPayloadAsJson = request.query[`deviceSessionCommandPayloadAsJson`] as string;

    console.log(userIdToken);

    const userId = `testuser`;

    const deviceSessionDbInfo = await prisma.deviceSession.findFirst({
      where: {
        id: deviceSessionId,
      },
      include: {
        device: true,
      },
    });

    if (deviceSessionDbInfo === null) {

      response.statusCode = 400;
      response.json(`device_session_does_not_exist`);
      return;
    }

    if (deviceSessionDbInfo.device.userId !== userId) {

      response.statusCode = 400;
      response.json(`device_session_does_not_exist`);
      return;
    }

    if (deviceSessionDbInfo.status !== DeviceSessionStatus.Confirmed) {

      response.statusCode = 400;
      response.json(`device_session_is_not_confirmed`);
      return;
    }

    // TODO: Check payloadAsJson validity

    await prisma.$transaction([
      prisma.deviceSessionCommand.create({
        data: {
          deviceSessionId: deviceSessionId,
          status: DeviceSessionCommandStatus.Pending,
          payloadAsJson: deviceSessionCommandPayloadAsJson,
        },
      }),
      prisma.deviceSession.update({
        where: {
          id: deviceSessionId,
        },
        data: {
          lastActivityDateTime: new Date(),
        },
      }),
    ]);

    response.json(null);
  },
);


app.get(
  `/create-device-session`,
  async (request, response) => {

    const deviceId = request.query[`deviceId`] as string;
    const deviceSessionEncryptedNonce = request.query[`deviceSessionEncryptedNonce`] as string;

    const deviceDbInfo = await prisma.device.findFirst({
      where: {
        id: deviceId,
      },
    });

    if (
      deviceDbInfo === null
    ) {

      response.statusCode = 400;
      response.json(`device_does_not_exist`);
      return;
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

    const deviceSessionDbInfo = await prisma.deviceSession.create({
      data: {
        deviceId: deviceId,
        accessToken: deviceSessionAccessToken,
      },
    });

    const deviceSessionId = deviceSessionDbInfo.id;

    response.json({
      deviceSessionId,
      deviceSessionAccessToken,
      deviceSessionNonce,
    })
  },
);

app.get(
  `/confirm-device-session`,
  async (request, response) => {

    const deviceSessionId = request.query[`deviceSessionId`] as string;
    const deviceSessionAccessToken = request.query[`deviceSessionAccessToken`] as string;

    const deviceSessionLastDbInfo = await prisma.deviceSession.findFirst({
      where: {
        id: deviceSessionId,
      },
    });

    if (
      deviceSessionLastDbInfo === null
    ) {

      response.statusCode = 400;
      response.json(`device_session_does_not_exist`);
      return;
    }

    if (
      deviceSessionLastDbInfo.accessToken !== deviceSessionAccessToken
    ) {

      response.statusCode = 400;
      response.json(`device_session_access_token_is_invalid`);
      return;
    }

    if (
      deviceSessionLastDbInfo.status === DeviceSessionStatus.Confirmed
    ) {

      response.statusCode = 400;
      response.json(`device_session_is_already_confirmed`);
      return;
    }

    if (
      deviceSessionLastDbInfo.status === DeviceSessionStatus.Rejected
    ) {

      response.statusCode = 400;
      response.json(`device_session_is_already_rejected`);
      return;
    }

    const deviceId = deviceSessionLastDbInfo.deviceId;

    await prisma.$transaction([
      prisma.deviceSession.update({
        where: {
          id: deviceSessionId,
        },
        data: {
          status: DeviceSessionStatus.Confirmed,
          lastActivityDateTime: new Date(),
        },
      }),
      prisma.device.update({
        where: {
          id: deviceId,
        },
        data: {
          activeSessionId: deviceSessionId,
        },
      }),
    ]);

    response.json(null);
  },
);

app.get(
  `/reject-device-session`,
  async (request, response) => {

    const deviceSessionId = request.query[`deviceSessionId`] as string;
    const deviceSessionAccessToken = request.query[`deviceSessionAccessToken`] as string;

    const deviceSessionLastDbInfo = await prisma.deviceSession.findFirst({
      where: {
        id: deviceSessionId,
      },
    });

    if (
      deviceSessionLastDbInfo === null
    ) {

      response.statusCode = 400;
      response.json(`device_session_does_not_exist`);
      return;
    }

    if (
      deviceSessionLastDbInfo.accessToken !== deviceSessionAccessToken
    ) {

      response.statusCode = 400;
      response.json(`device_session_access_token_is_invalid`);
      return;
    }

    if (
      deviceSessionLastDbInfo.status === DeviceSessionStatus.Confirmed
    ) {

      response.statusCode = 400;
      response.json(`device_session_is_already_confirmed`);
      return;
    }

    if (
      deviceSessionLastDbInfo.status === DeviceSessionStatus.Rejected
    ) {

      response.statusCode = 400;
      response.json(`device_session_is_already_rejected`);
      return;
    }

    await prisma.deviceSession.update({
      where: {
        id: deviceSessionId,
      },
      data: {
        status: DeviceSessionStatus.Rejected,
        lastActivityDateTime: new Date(),
      },
    });

    response.json(null);
  },
);

app.get(
  `/on-device-session-state-changed`,
  async (request, response) => {

    const deviceSessionId = request.query[`deviceSessionId`] as string;
    const deviceSessionAccessToken = request.query[`deviceSessionAccessToken`] as string;
    const deviceSessionStateAsJson = request.query[`deviceSessionStateAsJson`] as string;

    const deviceSessionLastDbInfo = await prisma.deviceSession.findFirst({
      where: {
        id: deviceSessionId,
      },
    });

    if (
      deviceSessionLastDbInfo === null
    ) {

      response.statusCode = 400;
      response.json(`device_session_does_not_exist`);
      return;
    }

    if (
      deviceSessionLastDbInfo.accessToken !== deviceSessionAccessToken
    ) {

      response.statusCode = 400;
      response.json(`device_session_access_token_is_invalid`);
      return;
    }

    if (
      deviceSessionLastDbInfo.status !== DeviceSessionStatus.Confirmed
    ) {

      response.statusCode = 400;
      response.json(`device_session_is_not_confirmed`);
      return;
    }

    // TODO: Check stateAsJson validity

    await prisma.deviceSession.update({
      where: {
        id: deviceSessionId,
      },
      data: {
        stateAsJson: deviceSessionStateAsJson,
        lastActivityDateTime: new Date(),
      },
    });
    
    response.json(null);
  },
);

app.get(
  `/fetch-device-session-next-pending-command-info`,
  async (request, response) => {

    const deviceSessionId = request.query[`deviceSessionId`] as string;
    const deviceSessionAccessToken = request.query[`deviceSessionAccessToken`] as string;

    const deviceSessionDbInfo = await prisma.deviceSession.findFirst({
      where: {
        id: deviceSessionId,
      },
    });

    if (
      deviceSessionDbInfo === null
    ) {

      response.statusCode = 400;
      response.json(`device_session_does_not_exist`);
      return;
    }

    if (
      deviceSessionDbInfo.accessToken !== deviceSessionAccessToken
    ) {

      response.statusCode = 400;
      response.json(`device_session_access_token_is_invalid`);
      return;
    }

    if (
      deviceSessionDbInfo.status !== DeviceSessionStatus.Confirmed
    ) {

      response.statusCode = 400;
      response.json(`device_session_is_not_confirmed`);
      return;
    }

    const deviceSessionNextPendingCommandDbInfo = await prisma.deviceSessionCommand.findFirst({
      where: {
        deviceSessionId: deviceSessionId,
        status: DeviceSessionCommandStatus.Pending,
      },
      orderBy: {
        createdDateTime: `asc`,
      },
    });

    if (deviceSessionNextPendingCommandDbInfo === null) {

      response.json(null);
      return;
    }

    response.json({
      id: deviceSessionNextPendingCommandDbInfo.id,
      payload: JSON.parse(deviceSessionNextPendingCommandDbInfo.payloadAsJson),
    } as DeviceCommandInfo);
  },
);

app.get(
  `/on-device-session-command-finished`,
  async (request, response) => {

    const deviceSessionId = request.query[`deviceSessionId`] as string;
    const deviceSessionAccessToken = request.query[`deviceSessionAccessToken`] as string;
    const deviceSessionCommandId = request.query[`deviceSessionCommandId`] as string;

    const deviceSessionDbInfo = await prisma.deviceSession.findFirst({
      where: {
        id: deviceSessionId,
      },
    });

    if (
      deviceSessionDbInfo === null
    ) {

      response.statusCode = 400;
      response.json(`device_session_does_not_exist`);
      return;
    }

    if (
      deviceSessionDbInfo.accessToken !== deviceSessionAccessToken
    ) {

      response.statusCode = 400;
      response.json(`device_session_access_token_is_invalid`);
      return;
    }

    if (
      deviceSessionDbInfo.status !== DeviceSessionStatus.Confirmed
    ) {

      response.statusCode = 400;
      response.json(`device_session_is_not_confirmed`);
      return;
    }

    const deviceSessionCommandLastDbInfo = await prisma.deviceSessionCommand.findFirst({
      where: {
        id: deviceSessionCommandId,
      },
    });

    if (deviceSessionCommandLastDbInfo === null) {

      response.statusCode = 400;
      response.json(`device_session_command_does_not_exist`);
      return;
    }

    if (deviceSessionCommandLastDbInfo.status === DeviceSessionCommandStatus.Finished) {

      response.statusCode = 400;
      response.json(`device_session_command_is_already_finished`);
      return;
    }

    await prisma.deviceSessionCommand.update({
      where: {
        id: deviceSessionCommandId,
      },
      data: {
        status: DeviceSessionCommandStatus.Finished,
      },
    });

    response.json(null);
  },
);

const port = 4000;

app.listen(port, async () => {

  console.log(`✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔`)
  console.log(`✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔`)
  console.log(`✔✔✔✔✔✔ cosplay-pi-hub-backend working at port ${port} ✔✔✔✔✔✔`);
  console.log(`✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔`)
  console.log(`✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔`)
});
