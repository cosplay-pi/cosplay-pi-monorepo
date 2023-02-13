import {
  DeviceInfo,
  FetchUserDevicesInfoAsync,
} from "cosplay-pi-hub-backend-protocol";

import { exportHubBackendAsyncFunc } from "./export-hub-backend-async-func";
import { fetchUserAuthInfoAsync } from "./fetch-user-auth-info-async";
import { prismaClient } from "./prisma-client";

exportHubBackendAsyncFunc<FetchUserDevicesInfoAsync>(
  `fetch-user-devices-info`,
  async ({
    userIdToken,
  }) => {

    const userAuthInfo = await fetchUserAuthInfoAsync({ userIdToken });

    const userDevicesDbInfo = await prismaClient.device.findMany({
      where: {
        userId: userAuthInfo.id,
      },
    });

    const userDevicesInfo: {
      [userDeviceId: string]: DeviceInfo,
    } = {
    };

    for (const userDeviceDbInfo of userDevicesDbInfo) {

      userDevicesInfo[userDeviceDbInfo.id] = {
        profile: {
          name: userDeviceDbInfo.name,
          description: userDeviceDbInfo.description,
        },
      };
    }

    return userDevicesInfo;
  },
);
