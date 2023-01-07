import { $exportHubBackendFunc } from "./$export-hub-backend-func";
import { DeviceDoesNotExist } from "./device-does-not-exist";
import { fetchUserAuthInfoAsync } from "./fetch-user-auth-info-async";
import { prismaClient } from "./prisma-client";

$exportHubBackendFunc(
  `fetch-device-active-session-id`,
  async ({
    userIdToken,
    deviceId,
  }: {
    userIdToken: string;
    deviceId: string;
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
