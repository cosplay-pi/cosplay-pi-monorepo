import fetch from 'node-fetch';

import { fetchDeviceSessionId, setDeviceSessionId } from "./device-session-id";
import { getHubBackendUrl } from './get-hub-backend-url';

export const createDeviceSessionAsync = async () => {

  if (fetchDeviceSessionId() !== undefined) {

    throw new Error();
  }

  const hubBackendUrl = getHubBackendUrl();

  const response = await fetch(`${hubBackendUrl}/create-device-session?device_id=my-device-123`);

  if (response.status !== 200) {

    throw new Error();
  }

  const { deviceSessionId } =
    await response.json() as {
      deviceSessionId: string;
    };

  setDeviceSessionId(deviceSessionId);
};
