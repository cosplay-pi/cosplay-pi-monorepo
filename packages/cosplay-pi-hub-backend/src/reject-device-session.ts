import { DeviceSessionStatus } from "@prisma/client";
import {
  DeviceSessionAccessTokenIsNotValid,
  DeviceSessionDoesNotExist,
  DeviceSessionIsAlreadyConfirmed,
  DeviceSessionIsAlreadyRejected,
  RejectDeviceSession,
} from "cosplay-pi-hub-backend-protocol";

import { exportHubBackendFunc } from "./export-hub-backend-func";
import { prismaClient } from "./prisma-client";

exportHubBackendFunc<RejectDeviceSession>(
  `reject-device-session`,
  async ({
    deviceSessionId,
    deviceSessionAccessToken,
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

    await prismaClient.deviceSession.update({
      where: {
        id: deviceSessionId,
      },
      data: {
        status: DeviceSessionStatus.Rejected,
        lastActivityDateTime: new Date(),
      },
    });
  },
);
