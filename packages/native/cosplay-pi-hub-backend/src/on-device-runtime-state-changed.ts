import {
  DeviceDoesNotExist,
  DeviceSessionAccessTokenIsNotValid,
  DeviceSessionDoesNotExist,
  OnDeviceRuntimeStateChanged,
} from "cosplay-pi-hub-backend-protocol";

import { exportHubBackendFunc } from "./export-hub-backend-func";
import { prismaClient } from "./prisma-client";

exportHubBackendFunc<OnDeviceRuntimeStateChanged>(
  `on-device-runtime-state-changed`,
  async ({
    deviceId,
    deviceActiveSessionAccessToken,
    deviceRuntimeState,
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

    const deviceActiveSessionId = deviceDbInfo.activeSessionId;

    if (deviceActiveSessionId === null) {

      throw new DeviceSessionDoesNotExist();
    }

    const deviceActiveSessionDbInfo = await prismaClient.deviceSession.findFirst({
      where: {
        id: deviceActiveSessionId,
      },
    });

    if (deviceActiveSessionDbInfo === null) {

      throw new DeviceSessionDoesNotExist();
    }

    if (
      deviceActiveSessionDbInfo.accessToken !== deviceActiveSessionAccessToken
    ) {

      throw new DeviceSessionAccessTokenIsNotValid();
    }

    await prismaClient.$transaction([
      prismaClient.device.update({
        where: {
          id: deviceId,
        },
        data: {
          // TODO: Verify schema
          // @ts-expect-error
          runtimeLastState: deviceRuntimeState,
        },
      }),
      prismaClient.deviceSession.update({
        where: {
          id: deviceActiveSessionId,
        },
        data: {
          lastActivityDateTime: new Date(),
        },
      }),
    ]);
  },
);
