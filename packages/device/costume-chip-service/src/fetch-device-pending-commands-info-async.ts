import fetch from 'node-fetch';

import { DeviceCommandInfo } from 'costume-chip-device-service-protocol';

import { fetchDeviceSessionId } from './device-session-id';
import { getHubBackendUrl } from './get-hub-backend-url';

export const fetchDevicePendingCommandsInfoAsync = async () => {

  const deviceSessionId = fetchDeviceSessionId();
  
  const hubBackendUrl = getHubBackendUrl();

  const response = await fetch(`${hubBackendUrl}/fetch-device-pending-commands-info?device_session_id=${deviceSessionId}`);

  if (response.status !== 200) {

    throw new Error();
  }

  return await response.json() as Array<DeviceCommandInfo>;
}
