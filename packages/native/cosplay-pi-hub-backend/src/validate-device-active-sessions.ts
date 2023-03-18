import { prismaClient } from './prisma-client';

export const validateDeviceActiveSessions = async () => {

  const devicesDbInfo = await prismaClient.device.findMany();

  for (const deviceDbInfo of devicesDbInfo) {

    if (deviceDbInfo.activeSessionId === null) {

      continue;
    }

    const deviceActiveSessionDbInfo =
      await prismaClient.deviceSession.findFirst({
        where: {
          id: deviceDbInfo.activeSessionId,
        },
      });

    if (deviceActiveSessionDbInfo === null) {

      continue;
    }

    const deviceActiveSessionExpiresAt =
      new Date(
        deviceActiveSessionDbInfo.lastActivityDateTime.getTime()
        +
        15 * 60 * 1000,
      );

    if (deviceActiveSessionExpiresAt < new Date()) {

      console.log(`Device session expired: ${deviceActiveSessionDbInfo.id}`);

      await prismaClient.device.update({
        where: {
          id: deviceDbInfo.id,
        },
        data: {
          activeSessionId: null,
        },
      });
    }
  }
};
