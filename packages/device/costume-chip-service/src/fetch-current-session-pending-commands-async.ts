import fetch from 'node-fetch';

import { ServiceCommandInfo } from 'costume-chip-service-protocol';

import { hubBackendUrl } from './hub-backend-url';
import { fetchHubCurrentSessionId } from './hub-current-session-id';

export const fetchCurrentSessionPendingCommandsAsync = async () => {

  const currentSessionId = fetchHubCurrentSessionId();

  const response = await fetch(`${hubBackendUrl}/fetch-service-pending-commands-info?session_id=${currentSessionId}`);

  if (response.status !== 200) {

    throw new Error();
  }

  return await response.json() as Array<ServiceCommandInfo>;
}
