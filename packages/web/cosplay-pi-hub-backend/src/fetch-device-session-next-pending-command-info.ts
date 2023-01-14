import {
  DeviceSessionCommandStatus,
  DeviceSessionStatus,
} from "@prisma/client";
import {
  DeviceCommandInfo,
  FetchDeviceSessionNextPendingCommandInfoAsync,
} from "cosplay-pi-device-hub-backend-protocol";

import { $exportHubBackendAsyncFunc } from "./$export-hub-backend-async-func";
import { DeviceSessionAccessTokenIsNotValid } from "./device-session-access-token-is-not-valid";
import { DeviceSessionDoesNotExist } from "./device-session-does-not-exist";
import { DeviceSessionIsNotConfirmed } from "./device-session-is-not-confirmed";
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
