import {
  DeviceSessionCommandStatus,
  DeviceSessionStatus,
} from "@prisma/client";
import {
  DeviceCommandInfo,
  DeviceSessionAccessTokenIsNotValid,
  DeviceSessionDoesNotExist,
  DeviceSessionIsNotConfirmed,
  FetchDeviceSessionNextPendingCommandInfoAsync,
} from "cosplay-pi-hub-backend-protocol";

import { $exportHubBackendAsyncFunc } from "./$export-hub-backend-async-func";
import { prismaClient } from "./prisma-client";

$exportHubBackendAsyncFunc<FetchDeviceSessionNextPendingCommandInfoAsync>(
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
        deviceSessionId: deviceSessionId,
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
      payload: JSON.parse(deviceSessionNextPendingCommandDbInfo.payloadAsJson),
    } as DeviceCommandInfo;
  },
);
