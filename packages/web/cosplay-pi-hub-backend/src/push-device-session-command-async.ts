import {
  DeviceSessionCommandStatus,
  DeviceSessionStatus,
} from "@prisma/client";
import {
  DeviceSessionDoesNotExist,
  DeviceSessionIsNotConfirmed,
  PushDeviceSessionCommandAsync,
} from "cosplay-pi-hub-backend-protocol";

import { $exportHubBackendAsyncFunc } from "./$export-hub-backend-async-func";
import { fetchUserAuthInfoAsync } from "./fetch-user-auth-info-async";
import { prismaClient } from "./prisma-client";

$exportHubBackendAsyncFunc<PushDeviceSessionCommandAsync>(
  `push-device-session-command`,
  async ({
    userIdToken,
    deviceSessionId,
    deviceSessionCommandPayload,
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

    await prismaClient.$transaction([
      prismaClient.deviceSessionCommand.create({
        data: {
          deviceSessionId: deviceSessionId,
          status: DeviceSessionCommandStatus.Pending,
          payloadAsJson: JSON.stringify(deviceSessionCommandPayload),
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
