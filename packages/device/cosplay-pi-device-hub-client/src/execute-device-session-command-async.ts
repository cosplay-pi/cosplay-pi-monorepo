import { onDeviceSessionCommandFinishedAsync } from 'cosplay-pi-hub-backend-client';
import { DeviceCommandInfo } from 'cosplay-pi-hub-backend-protocol';

import { DeviceSessionInfo } from './device-session-info';
import { executeDeviceCommandAsync } from './execute-device-command-async';

export const executeDeviceSessionCommandAsync = async ({
  deviceSessionInfo,
  deviceSessionCommandInfo,
}: {
  deviceSessionInfo: DeviceSessionInfo;
  deviceSessionCommandInfo: DeviceCommandInfo;
}) => {

  try {

    await executeDeviceCommandAsync({
      deviceCommandInfo: deviceSessionCommandInfo,
    });

  } finally {

    await onDeviceSessionCommandFinishedAsync({
      deviceSessionId: deviceSessionInfo.id,
      deviceSessionAccessToken: deviceSessionInfo.accessToken,
      deviceSessionCommandId: deviceSessionCommandInfo.id,
    });
  }
};
