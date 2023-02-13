import * as crypto from 'crypto';
import * as fs from 'fs';

import {
  fetchDeviceCachedPublicKey,
  setDeviceCachedPublicKey,
} from './device-cached-public-key';
import { devicePublicKeyFilePath } from './env';

export const getDevicePublicKey = () => {

  const deviceLastCachedPublicKey = fetchDeviceCachedPublicKey();

  if (deviceLastCachedPublicKey !== undefined) {

    return deviceLastCachedPublicKey;
  }

  const devicePublicKeyAsPem = fs.readFileSync(
    devicePublicKeyFilePath,
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
