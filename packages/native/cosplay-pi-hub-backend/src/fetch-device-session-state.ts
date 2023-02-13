import { DeviceSessionStatus } from "@prisma/client";
import {
  DeviceSessionDoesNotExist,
  DeviceSessionIsNotConfirmed,
  FetchDeviceSessionState,
} from "cosplay-pi-hub-backend-protocol";

import { exportHubBackendFunc } from "./export-hub-backend-func";
import { fetchUserAuthInfo } from "./fetch-user-auth-info";
import { prismaClient } from "./prisma-client";

exportHubBackendFunc<FetchDeviceSessionState>(
  `fetch-device-session-state`,
  async ({
    userIdToken,
    deviceSessionId,
  }) => {

    const userAuthInfo = await fetchUserAuthInfo({ userIdToken });

    const deviceSessionDbInfo = await prismaClient.deviceSession.findFirst({
      where: {
        id: deviceSessionId,
      },
      include: {
        device: true,
      },
    });

    if (deviceSessionDbInfo === null) {

      throw new DeviceSessionDoesNotExist();
    }

    if (deviceSessionDbInfo.device.userId !== userAuthInfo.id) {

      throw new DeviceSessionDoesNotExist();
    }

    if (deviceSessionDbInfo.status !== DeviceSessionStatus.Confirmed) {

      throw new DeviceSessionIsNotConfirmed();
    }

    if (deviceSessionDbInfo.stateAsJson === null) {

      return undefined;
    }

    return JSON.parse(deviceSessionDbInfo.stateAsJson);
  },
);
