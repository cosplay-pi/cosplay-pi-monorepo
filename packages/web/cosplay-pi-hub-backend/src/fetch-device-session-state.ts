import { DeviceSessionStatus } from "@prisma/client";

import { $exportHubBackendFunc } from "./$export-hub-backend-func";
import { DeviceSessionDoesNotExist } from "./device-session-does-not-exist";
import { DeviceSessionIsNotConfirmed } from "./device-session-is-not-confirmed";
import { fetchUserAuthInfoAsync } from "./fetch-user-auth-info-async";
import { prismaClient } from "./prisma-client";

$exportHubBackendFunc(
  `fetch-device-session-state`,
  async ({
    userIdToken,
    deviceSessionId,
  }: {
    userIdToken: string;
    deviceSessionId: string;
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
