import * as express from 'express';
import * as crypto from 'crypto';

import { DeviceSessionCommandStatus, DeviceSessionStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import {
  DeviceCommandInfo,
  DeviceCommandType,
  DeviceInstallRuntimeCommandInfo,
  DeviceStartRuntimeCommandInfo,
  DeviceUpdateRuntimeModuleSettingsCommandInfo,
} from 'costume-chip-device-service-protocol';

let mockCounter = 3;

let mockData: Array<DeviceCommandInfo> = [
  {
    id: 0,
    type: DeviceCommandType.InstallRuntimeCommand,
    deviceRuntimeConfig: {
      modules: {
        "costume-chip-example-module": {
          version: `link:../../packages/device/costume-chip-example-module`,
        },
      },
    },
  } as DeviceInstallRuntimeCommandInfo,
  {
    id: 1,
    type: DeviceCommandType.StartRuntimeCommand,
  } as DeviceStartRuntimeCommandInfo,
  {
    id: 2,
    type: DeviceCommandType.UpdateRuntimeModuleSettingsCommand,
    deviceRuntimeModuleName: `costume-chip-example-module`,
    deviceRuntimeModuleSettings: {
      message: `Today is ${new Date().toLocaleDateString()}`,
    },
  } as DeviceUpdateRuntimeModuleSettingsCommandInfo,
];

const app = express();

app.get(
  `/fetch-device-pending-commands-info`,
  (request, response) => {

    console.log(request.url);
    console.log(request.query);

    const deviceSessionId = request.query[`device_session_id`] as string;

    console.log(deviceSessionId);

    response.json(mockData);
  },
);

app.get(
  `/on-device-command-finished`,
  (request, response) => {

    console.log(request.url);
    console.log(request.query);

    const deviceSessionId = request.query[`device_session_id`] as string;
    const deviceCommandId = parseInt(request.query[`device_command_id`] as string);

    console.log(deviceSessionId);
    console.log(deviceCommandId);

    mockData = mockData.filter(
      (deviceOtherCommand) => deviceOtherCommand.id > deviceCommandId,
    );

    response.json({});
  },
);

app.get(
  `/test`,
  (request, response) => {

    console.log(request.url);
    console.log(request.query);

    const msg = request.query[`msg`] as string;

    mockData.push({
      id: mockCounter++,
      type: DeviceCommandType.UpdateRuntimeModuleSettingsCommand,
      deviceRuntimeModuleName: `costume-chip-example-module`,
      deviceRuntimeModuleSettings: {
        message: msg,
      },
    } as DeviceUpdateRuntimeModuleSettingsCommandInfo);

    response.json({});
  },
);

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
}

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

    // TODO: Catch if private key is invalid
    const userDevicePrivateKey = crypto.createPrivateKey({
      key: {
        kty: userDevicePrivateKeyKty,
        n: userDevicePrivateKeyN,
        e: userDevicePrivateKeyE,
        d: userDevicePrivateKeyD,
        p: userDevicePrivateKeyP,
        q: userDevicePrivateKeyQ,
        dp: userDevicePrivateKeyDp,
        dq: userDevicePrivateKeyDq,
        qi: userDevicePrivateKeyQi,
      },
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

    if (conflictingDeviceDbInfo !== undefined) {
    
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

    const deviceSessionAccessToken = `test`;

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

    response.json({});
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

    response.json({});
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
  },
);

app.listen(4000, async () => {

  console.log(`Hello!`);
});
