import {
  DeviceDoesNotExist,
  SetUserDeviceProfile,
} from 'cosplay-pi-hub-backend-protocol';

import { exportHubBackendFunc } from './export-hub-backend-func';
import { fetchUserAuthInfo } from './fetch-user-auth-info';
import { prismaClient } from './prisma-client';

exportHubBackendFunc<SetUserDeviceProfile>(
  `set-user-device-profile`,
  async ({
    userIdToken,
    userDeviceId,
    userDeviceProfile,
  }) => {

    const userAuthInfo = await fetchUserAuthInfo({
      userIdToken,
    });

    const deviceDbInfo = await prismaClient.device.findFirst({
      where: {
        id: userDeviceId,
      },
    });

    if (deviceDbInfo === null) {

      throw new DeviceDoesNotExist();
    }

    if (deviceDbInfo.userId !== userAuthInfo.id) {

      throw new DeviceDoesNotExist();
    }

    await prismaClient.device.update({
      where: {
        id: userDeviceId,
      },
      data: {
        name: userDeviceProfile.name,
        description: userDeviceProfile.description,
      },
    });
  },
);
