import { DeviceSessionStatus } from "@prisma/client";
import { OnDeviceSessionStateChangedAsync } from "cosplay-pi-device-hub-backend-protocol";

import { $exportHubBackendAsyncFunc } from "./$export-hub-backend-async-func";
import { DeviceSessionAccessTokenIsNotValid } from "./device-session-access-token-is-not-valid";
import { DeviceSessionDoesNotExist } from "./device-session-does-not-exist";
import { DeviceSessionIsNotConfirmed } from "./device-session-is-not-confirmed";
import { prismaClient } from "./prisma-client";

$exportHubBackendAsyncFunc<OnDeviceSessionStateChangedAsync>(
  `on-device-session-state-changed`,
  async ({
    deviceSessionId,
    deviceSessionAccessToken,
    deviceSessionState,
  }) => {

    const deviceSessionLastDbInfo = await prismaClient.deviceSession.findFirst({
      where: {
        id: deviceSessionId,
      },
    });

    if (
      deviceSessionLastDbInfo === null
    ) {

      throw new DeviceSessionDoesNotExist();
    }

    if (
      deviceSessionLastDbInfo.accessToken !== deviceSessionAccessToken
    ) {

      throw new DeviceSessionAccessTokenIsNotValid();
    }

    if (
      deviceSessionLastDbInfo.status !== DeviceSessionStatus.Confirmed
    ) {

      throw new DeviceSessionIsNotConfirmed();
    }

    await prismaClient.deviceSession.update({
      where: {
        id: deviceSessionId,
      },
      data: {
        stateAsJson: JSON.stringify(deviceSessionState),
        lastActivityDateTime: new Date(),
      },
    });
  },
);
