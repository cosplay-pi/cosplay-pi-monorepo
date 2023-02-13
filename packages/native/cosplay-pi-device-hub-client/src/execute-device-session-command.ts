import { onDeviceSessionCommandFinished } from 'cosplay-pi-hub-backend-client';
import { DeviceCommandInfo } from 'cosplay-pi-hub-backend-protocol';

import { DeviceSessionInfo } from './device-session-info';
import { executeDeviceCommand } from './execute-device-command';

export const executeDeviceSessionCommand = async ({
  deviceSessionInfo,
  deviceSessionCommandInfo,
}: {
  deviceSessionInfo: DeviceSessionInfo;
  deviceSessionCommandInfo: DeviceCommandInfo;
}) => {

  try {

    await executeDeviceCommand({
      deviceCommandInfo: deviceSessionCommandInfo,
    });

  } finally {

    await onDeviceSessionCommandFinished({
      deviceSessionId: deviceSessionInfo.id,
      deviceSessionAccessToken: deviceSessionInfo.accessToken,
      deviceSessionCommandId: deviceSessionCommandInfo.id,
    });
  }
};
