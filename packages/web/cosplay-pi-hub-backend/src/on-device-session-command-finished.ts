import {
  DeviceSessionCommandStatus,
  DeviceSessionStatus,
} from "@prisma/client";
import { OnDeviceSessionCommandFinishedAsync } from "cosplay-pi-device-hub-backend-protocol";

import { $exportHubBackendAsyncFunc } from "./$export-hub-backend-async-func";
import { DeviceSessionAccessTokenIsNotValid } from "./device-session-access-token-is-not-valid";
import { DeviceSessionCommandDoesNotExist } from "./device-session-command-does-not-exist";
import { DeviceSessionCommandIsAlreadyFinished } from "./device-session-command-is-already-finished";
import { DeviceSessionDoesNotExist } from "./device-session-does-not-exist";
import { DeviceSessionIsNotConfirmed } from "./device-session-is-not-confirmed";
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
