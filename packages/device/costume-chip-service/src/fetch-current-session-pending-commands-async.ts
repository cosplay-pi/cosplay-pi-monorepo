import fetch from 'node-fetch';

import { DeviceCommandInfo } from 'costume-chip-service-protocol';

import { hubBackendUrl } from './hub-backend-url';
import { fetchCurrentSessionId } from './current-session-id';

export const fetchCurrentSessionPendingCommandsAsync = async () => {

  const currentSessionId = fetchCurrentSessionId();

  const response = await fetch(`${hubBackendUrl}/fetch-service-pending-commands-info?session_id=${currentSessionId}`);

  if (response.status !== 200) {

    throw new Error();
  }

  return await response.json() as Array<DeviceCommandInfo>;
}
