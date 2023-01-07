import {
  DeviceSessionCommandStatus,
  DeviceSessionStatus,
} from "@prisma/client";

import { $exportHubBackendFunc } from "./$export-hub-backend-func";
import { DeviceSessionDoesNotExist } from "./device-session-does-not-exist";
import { DeviceSessionIsNotConfirmed } from "./device-session-is-not-confirmed";
import { fetchUserAuthInfoAsync } from "./fetch-user-auth-info-async";
import { prismaClient } from "./prisma-client";

$exportHubBackendFunc(
  `push-device-session-command`,
  async ({
    userIdToken,
    deviceSessionId,
    deviceSessionCommandPayloadAsJson,
  }: {
    userIdToken: string;
    deviceSessionId: string;
    deviceSessionCommandPayloadAsJson: string;
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

    // TODO: Check payloadAsJson validity

    await prismaClient.$transaction([
      prismaClient.deviceSessionCommand.create({
        data: {
          deviceSessionId: deviceSessionId,
          status: DeviceSessionCommandStatus.Pending,
          payloadAsJson: deviceSessionCommandPayloadAsJson,
        },
      }),
      prismaClient.deviceSession.update({
        where: {
          id: deviceSessionId,
        },
        data: {
          lastActivityDateTime: new Date(),
        },
      }),
    ]);
  },
);
