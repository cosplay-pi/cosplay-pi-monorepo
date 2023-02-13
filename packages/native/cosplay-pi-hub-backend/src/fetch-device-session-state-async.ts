import { DeviceSessionStatus } from "@prisma/client";
import {
  DeviceSessionDoesNotExist,
  DeviceSessionIsNotConfirmed,
  FetchDeviceSessionStateAsync,
} from "cosplay-pi-hub-backend-protocol";

import { exportHubBackendAsyncFunc } from "./export-hub-backend-async-func";
import { fetchUserAuthInfoAsync } from "./fetch-user-auth-info-async";
import { prismaClient } from "./prisma-client";

exportHubBackendAsyncFunc<FetchDeviceSessionStateAsync>(
  `fetch-device-session-state`,
  async ({
    userIdToken,
    deviceSessionId,
  }) => {

    const userAuthInfo = await fetchUserAuthInfoAsync({ userIdToken });

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
