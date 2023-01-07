import { DeviceSessionStatus } from "@prisma/client";

import { $exportHubBackendFunc } from "./$export-hub-backend-func";
import { DeviceSessionAccessTokenIsNotValid } from "./device-session-access-token-is-not-valid";
import { DeviceSessionDoesNotExist } from "./device-session-does-not-exist";
import { DeviceSessionIsNotConfirmed } from "./device-session-is-not-confirmed";
import { prismaClient } from "./prisma-client";

$exportHubBackendFunc(
  `on-device-session-state-changed`,
  async ({
    deviceSessionId,
    deviceSessionAccessToken,
    deviceSessionStateAsJson,
  }: {
    deviceSessionId: string;
    deviceSessionAccessToken: string;
    deviceSessionStateAsJson: string;
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

    // TODO: Check stateAsJson validity

    await prismaClient.deviceSession.update({
      where: {
        id: deviceSessionId,
      },
      data: {
        stateAsJson: deviceSessionStateAsJson,
        lastActivityDateTime: new Date(),
      },
    });
  },
);
