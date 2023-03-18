import {
  DeviceSessionCommandStatus,
  DeviceSessionStatus,
} from "@prisma/client";
import {
  DeviceCommandInfo,
  DeviceSessionAccessTokenIsNotValid,
  DeviceSessionDoesNotExist,
  DeviceSessionIsNotConfirmed,
  FetchDeviceSessionNextPendingCommandInfo,
} from "cosplay-pi-hub-backend-protocol";

import { exportHubBackendFunc } from "./export-hub-backend-func";
import { prismaClient } from "./prisma-client";

exportHubBackendFunc<FetchDeviceSessionNextPendingCommandInfo>(
  `fetch-device-session-next-pending-command-info`,
  async ({
    deviceSessionId,
    deviceSessionAccessToken,
  }) => {

    const deviceSessionDbInfo = await prismaClient.deviceSession.findFirst({
      where: {
        id: deviceSessionId,
      },
    });

    if (
      deviceSessionDbInfo === null
    ) {

      throw new DeviceSessionDoesNotExist();
    }

    if (
      deviceSessionDbInfo.accessToken !== deviceSessionAccessToken
    ) {

      throw new DeviceSessionAccessTokenIsNotValid();
    }

    if (
      deviceSessionDbInfo.status !== DeviceSessionStatus.Confirmed
    ) {

      throw new DeviceSessionIsNotConfirmed();
    }

    const deviceSessionNextPendingCommandDbInfo = await prismaClient.deviceSessionCommand.findFirst({
      where: {
        sessionId: deviceSessionId,
        status: DeviceSessionCommandStatus.Pending,
      },
      orderBy: {
        createdDateTime: `asc`,
      },
    });

    if (deviceSessionNextPendingCommandDbInfo === null) {

      return undefined;
    }

    return {
      id: deviceSessionNextPendingCommandDbInfo.id,
      payload: deviceSessionNextPendingCommandDbInfo.payload as unknown,
    } as DeviceCommandInfo;
  },
);
