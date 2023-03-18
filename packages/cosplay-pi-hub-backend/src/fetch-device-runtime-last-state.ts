import {
  DeviceDoesNotExist,
  DeviceRuntimeState,
  FetchDeviceRuntimeLastState,
} from "cosplay-pi-hub-backend-protocol";

import { exportHubBackendFunc } from "./export-hub-backend-func";
import { fetchUserAuthInfo } from "./fetch-user-auth-info";
import { prismaClient } from "./prisma-client";

exportHubBackendFunc<FetchDeviceRuntimeLastState>(
  `fetch-device-runtime-last-state`,
  async ({
    userIdToken,
    deviceId,
  }) => {

    const userAuthInfo = await fetchUserAuthInfo({ userIdToken });

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

    // TODO: Verify schema
    return deviceDbInfo.runtimeLastState as unknown as DeviceRuntimeState;
  },
);
