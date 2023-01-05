import fetch from 'node-fetch';

import { DeviceCommandInfo } from 'costume-chip-device-service-protocol';

import { DeviceSessionInfo } from './device-session-info';
import { executeDeviceCommandAsync } from './execute-device-command-async';
import { getHubBackendUrl } from './get-hub-backend-url';

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

    const hubBackendUrl = getHubBackendUrl();

    const requestUrl = new URL(hubBackendUrl);
    requestUrl.pathname = `/on-device-session-command-finished`;
    requestUrl.searchParams.append(
      `deviceSessionId`,
      deviceSessionInfo.id,
    );
    requestUrl.searchParams.append(
      `deviceSessionAccessToken`,
      deviceSessionInfo.accessToken,
    );
    requestUrl.searchParams.append(
      `deviceSessionCommandId`,
      deviceSessionCommandInfo.id,
    );

    await fetch(requestUrl.href);
  }
};