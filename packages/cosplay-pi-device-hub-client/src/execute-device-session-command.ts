import {
  onDeviceRuntimeStateChanged,
  onDeviceSessionCommandFinished,
} from 'cosplay-pi-hub-backend-client';
import { DeviceCommandInfo } from 'cosplay-pi-hub-backend-protocol';

import { DeviceSessionInfo } from './device-session-info';
import { executeDeviceCommand } from './execute-device-command';
import { fetchDeviceRuntimeState } from './fetch-device-runtime-state';
import { getDeviceId } from './get-device-id';

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

    const deviceId = getDeviceId();

    const deviceRuntimeState = fetchDeviceRuntimeState();

    await onDeviceRuntimeStateChanged({
      deviceId,
      deviceActiveSessionAccessToken: deviceSessionInfo.accessToken,
      deviceRuntimeState,
    });
  }
};
