import {
  DeviceDoesNotExist,
  FetchDeviceActiveSessionIdAsync,
} from "cosplay-pi-device-hub-backend-protocol";

import { $exportHubBackendAsyncFunc } from "./$export-hub-backend-async-func";
import { fetchUserAuthInfoAsync } from "./fetch-user-auth-info-async";
import { prismaClient } from "./prisma-client";

$exportHubBackendAsyncFunc<FetchDeviceActiveSessionIdAsync>(
  `fetch-device-active-session-id`,
  async ({
    userIdToken,
    deviceId,
  }) => {

    const userAuthInfo = await fetchUserAuthInfoAsync({ userIdToken });

    const deviceDbInfo = await prismaClient.device.findFirst({
      where: {
        id: deviceId,
      },
    });

    if (deviceDbInfo === null) {

      throw new DeviceDoesNotExist();
    }

    if (deviceDbInfo.userId !== userAuthInfo.id) {

      throw new DeviceDoesNotExist();
    }

    return deviceDbInfo.activeSessionId ?? undefined;
  },
);
