import {
  DeviceSessionCommandStatus,
  DeviceSessionStatus,
} from "@prisma/client";
import {
  DeviceSessionDoesNotExist,
  DeviceSessionIsNotConfirmed,
  PushDeviceSessionCommand,
} from "cosplay-pi-hub-backend-protocol";

import { exportHubBackendFunc } from "./export-hub-backend-func";
import { fetchUserAuthInfo } from "./fetch-user-auth-info";
import { prismaClient } from "./prisma-client";

exportHubBackendFunc<PushDeviceSessionCommand>(
  `push-device-session-command`,
  async ({
    userIdToken,
    deviceSessionId,
    deviceSessionCommandPayload,
  }) => {

    const userAuthInfo = await fetchUserAuthInfo({ userIdToken });

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
