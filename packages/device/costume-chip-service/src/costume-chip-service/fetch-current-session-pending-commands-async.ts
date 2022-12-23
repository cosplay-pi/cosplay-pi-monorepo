import fetch from 'node-fetch';

import * as _ from './_';

import { hubBackendUrl } from './hub-backend-url';
import { fetchHubCurrentSessionId } from './hub-current-session-id';

export const fetchCurrentSessionPendingCommandsAsync = async () => {

  const hubCurrentSessionId = fetchHubCurrentSessionId();

  const response = await fetch(`${hubBackendUrl}/fetch-service-session-pending-commands-info?service_session_id=${hubCurrentSessionId}`);

  if (response.status !== 200) {

    throw new Error();
  }

  return await response.json() as Array<_.CommandInfo>;
}
