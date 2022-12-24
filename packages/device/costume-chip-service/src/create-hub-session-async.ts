import fetch from 'node-fetch';

import { hubBackendUrl } from './hub-backend-url';
import { fetchHubCurrentSessionId, setHubCurrentSessionId } from "./hub-current-session-id";

export const createHubSessionAsync = async () => {

  if (fetchHubCurrentSessionId() !== undefined) {

    throw new Error();
  }

  console.log(`${hubBackendUrl}/create-session?device_id=my-device-123`);
  
  const response = await fetch(`${hubBackendUrl}/create-session?device_id=my-device-123`);

  if (response.status !== 200) {

    throw new Error();
  }

  const { sessionId } =
    await response.json() as {
      sessionId: string;
    };

  setHubCurrentSessionId(sessionId);
};
