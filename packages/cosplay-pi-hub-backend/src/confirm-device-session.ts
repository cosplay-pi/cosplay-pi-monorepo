import { DeviceSessionStatus } from "@prisma/client";
import {
  ConfirmDeviceSession,
  DeviceSessionAccessTokenIsNotValid,
  DeviceSessionDoesNotExist,
  DeviceSessionIsAlreadyConfirmed,
  DeviceSessionIsAlreadyRejected,
} from "cosplay-pi-hub-backend-protocol";

import { exportHubBackendFunc } from "./export-hub-backend-func";
import { prismaClient } from "./prisma-client";

exportHubBackendFunc<ConfirmDeviceSession>(
  `confirm-device-session`,
  async ({
    deviceSessionId,
    deviceSessionAccessToken,
    deviceRuntimeState,
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
      deviceSessionLastDbInfo.status === DeviceSessionStatus.Confirmed
    ) {

      throw new DeviceSessionIsAlreadyConfirmed();
    }

    if (
      deviceSessionLastDbInfo.status === DeviceSessionStatus.Rejected
    ) {

      throw new DeviceSessionIsAlreadyRejected();
    }

    const deviceId = deviceSessionLastDbInfo.deviceId;

    await prismaClient.$transaction([
      prismaClient.deviceSession.update({
        where: {
          id: deviceSessionId,
        },
        data: {
          status: DeviceSessionStatus.Confirmed,
          lastActivityDateTime: new Date(),
        },
      }),
      prismaClient.device.update({
        where: {
          id: deviceId,
        },
        data: {
          // TODO: Verify schema
          // @ts-expect-error
          runtimeLastState: deviceRuntimeState,
          activeSessionId: deviceSessionId,
        },
      }),
    ]);
  },
);
