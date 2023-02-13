import {
  DeviceInfo,
  FetchUserDevicesInfo,
} from "cosplay-pi-hub-backend-protocol";

import { exportHubBackendFunc } from "./export-hub-backend-func";
import { fetchUserAuthInfo } from "./fetch-user-auth-info";
import { prismaClient } from "./prisma-client";

exportHubBackendFunc<FetchUserDevicesInfo>(
  `fetch-user-devices-info`,
  async ({
    userIdToken,
  }) => {

    const userAuthInfo = await fetchUserAuthInfo({ userIdToken });

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
