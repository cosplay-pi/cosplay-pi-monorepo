import fetch from 'node-fetch';

import { hubBackendUrl } from './hub-backend-url';
import { fetchHubCurrentSessionId, setHubCurrentSessionId } from "./hub-current-session-id";

export const createHubSessionAsync = async () => {

  if (fetchHubCurrentSessionId() !== undefined) {

    throw new Error();
  }

  const response = await fetch(`${hubBackendUrl}/create-service-session?device_id=my-device-123`);

  if (response.status !== 200) {

    throw new Error();
  }

  const { serviceSessionId } =
    await response.json() as {
      serviceSessionId: string;
    };

  setHubCurrentSessionId(serviceSessionId);
};
