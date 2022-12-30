import * as express from 'express';
import * as crypto from 'crypto';

import { PrismaClient } from '@prisma/client';

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
  `/create-device-session`,
  (request, response) => {

    console.log(request.url);
    console.log(request.query);

    const deviceId = request.query[`device_id`] as string;

    console.log(deviceId);

    response.json({
      deviceSessionId: `${deviceId}-test-session`,
    });
  },
);

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
    const devicePrivateKeyKty = request.query[`devicePrivateKeyKty`] as string;
    const devicePrivateKeyN = request.query[`devicePrivateKeyN`] as string;
    const devicePrivateKeyE = request.query[`devicePrivateKeyE`] as string;
    const devicePrivateKeyD = request.query[`devicePrivateKeyD`] as string;
    const devicePrivateKeyP = request.query[`devicePrivateKeyP`] as string;
    const devicePrivateKeyQ = request.query[`devicePrivateKeyQ`] as string;
    const devicePrivateKeyDp = request.query[`devicePrivateKeyDp`] as string;
    const devicePrivateKeyDq = request.query[`devicePrivateKeyDq`] as string;
    const devicePrivateKeyQi = request.query[`devicePrivateKeyQi`] as string;

    console.log(userIdToken);
    
    const userId = `testuser`;

    const devicePrivateKey = crypto.createPrivateKey({
      key: {
        kty: devicePrivateKeyKty,
        n: devicePrivateKeyN,
        e: devicePrivateKeyE,
        d: devicePrivateKeyD,
        p: devicePrivateKeyP,
        q: devicePrivateKeyQ,
        dp: devicePrivateKeyDp,
        dq: devicePrivateKeyDq,
        qi: devicePrivateKeyQi,
      },
      format: `jwk`,
    });

    const devicePublicKey = getDevicePublicKey({
      devicePrivateKey,
    });

    const deviceId = getDeviceId({
      devicePublicKey,
    });

    const devicePrivateKeyAsPem = devicePrivateKey.export({
      type: `pkcs1`,
      format: `pem`,
    }) as string;
    
    await prisma.device.create({
      data: {
        id: deviceId,
        userId: userId,
        privateKeyAsPem: devicePrivateKeyAsPem,
      },
    });

    response.json({
      deviceId,
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

app.listen(4000, async () => {

  console.log(`Hello!`);
});
