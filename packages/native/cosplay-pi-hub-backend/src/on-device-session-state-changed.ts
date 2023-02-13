import { DeviceSessionStatus } from "@prisma/client";
import {
  DeviceSessionAccessTokenIsNotValid,
  DeviceSessionDoesNotExist,
  DeviceSessionIsNotConfirmed,
  OnDeviceSessionStateChanged,
} from "cosplay-pi-hub-backend-protocol";

import { exportHubBackendFunc } from "./export-hub-backend-func";
import { prismaClient } from "./prisma-client";

exportHubBackendFunc<OnDeviceSessionStateChanged>(
  `on-device-session-state-changed`,
  async ({
    deviceSessionId,
    deviceSessionAccessToken,
    deviceSessionState,
  }) => {

    const deviceSessionLastDbInfo = await prismaClient.deviceSession.findFirst({
      where: {
        id: deviceSessionId,
      },
    });

    if (
      deviceSessionLastDbInfo === null
    ) {

      throw new DeviceSessionDoesNotExist();
    }

    if (
      deviceSessionLastDbInfo.accessToken !== deviceSessionAccessToken
    ) {

      throw new DeviceSessionAccessTokenIsNotValid();
    }

    if (
      deviceSessionLastDbInfo.status !== DeviceSessionStatus.Confirmed
    ) {

      throw new DeviceSessionIsNotConfirmed();
    }

    await prismaClient.deviceSession.update({
      where: {
        id: deviceSessionId,
      },
      data: {
        stateAsJson: JSON.stringify(deviceSessionState),
        lastActivityDateTime: new Date(),
      },
    });
  },
);
