import { $exportHubBackendFunc } from "./$export-hub-backend-func";
import { fetchUserAuthInfoAsync } from "./fetch-user-auth-info-async";
import { prismaClient } from "./prisma-client";

$exportHubBackendFunc(
  `fetch-user-devices-info`,
  async ({
    userIdToken,
  }: {
    userIdToken: string;
  }) => {

    const userAuthInfo = await fetchUserAuthInfoAsync({ userIdToken });

    const userDevicesDbInfo = await prismaClient.device.findMany({
      where: {
        userId: userAuthInfo.id,
      },
    });

    const userDevicesInfo: {
      [userDeviceId: string]: {},
    } = {};

    for (const userDeviceDbInfo of userDevicesDbInfo) {

      userDevicesInfo[userDeviceDbInfo.id] = {};
    }

    return userDevicesInfo;
  },
);
