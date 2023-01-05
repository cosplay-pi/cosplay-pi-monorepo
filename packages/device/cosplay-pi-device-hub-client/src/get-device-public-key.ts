import * as fs from 'fs';
import * as crypto from 'crypto';

import { fetchDeviceCachedPublicKey, setDeviceCachedPublicKey } from './device-cached-public-key';
import { getDeviceHubClientArgs } from './get-device-hub-client-args';

export const getDevicePublicKey = () => {

  const deviceLastCachedPublicKey = fetchDeviceCachedPublicKey();

  if (deviceLastCachedPublicKey !== undefined) {

    return deviceLastCachedPublicKey;
  }

  const deviceHubClientArgs = getDeviceHubClientArgs();

  const devicePublicKeyAsPem = fs.readFileSync(
    deviceHubClientArgs.devicePublicKeyFilePath,
    `utf-8`,
  );

  const devicePublicKey = crypto.createPublicKey(
    {
      key: devicePublicKeyAsPem,
      format: `pem`,
    },
  );

  setDeviceCachedPublicKey(devicePublicKey);

  return devicePublicKey;
};
