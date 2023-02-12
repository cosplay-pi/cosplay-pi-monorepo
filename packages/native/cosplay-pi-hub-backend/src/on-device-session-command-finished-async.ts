import {
  DeviceSessionCommandStatus,
  DeviceSessionStatus,
} from "@prisma/client";
import {
  DeviceSessionAccessTokenIsNotValid,
  DeviceSessionCommandDoesNotExist,
  DeviceSessionCommandIsAlreadyFinished,
  DeviceSessionDoesNotExist,
  DeviceSessionIsNotConfirmed,
  OnDeviceSessionCommandFinishedAsync,
} from "cosplay-pi-hub-backend-protocol";

import { $exportHubBackendAsyncFunc } from "./$export-hub-backend-async-func";
import { prismaClient } from "./prisma-client";

$exportHubBackendAsyncFunc<OnDeviceSessionCommandFinishedAsync>(
  `on-device-session-command-finished`,
  async ({
    deviceSessionId,
    deviceSessionAccessToken,
    deviceSessionCommandId,
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

    const deviceSessionCommandLastDbInfo = await prismaClient.deviceSessionCommand.findFirst({
      where: {
        id: deviceSessionCommandId,
      },
    });

    if (deviceSessionCommandLastDbInfo === null) {

      throw new DeviceSessionCommandDoesNotExist();
    }

    if (deviceSessionCommandLastDbInfo.status === DeviceSessionCommandStatus.Finished) {

      throw new DeviceSessionCommandIsAlreadyFinished();
    }

    await prismaClient.deviceSessionCommand.update({
      where: {
        id: deviceSessionCommandId,
      },
      data: {
        status: DeviceSessionCommandStatus.Finished,
      },
    });
  },
);
