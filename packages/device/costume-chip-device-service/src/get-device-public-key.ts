import * as fs from 'fs';
import * as crypto from 'crypto';

import { fetchDeviceCachedPublicKey, setDeviceCachedPublicKey } from './device-cached-public-key';
import { getDeviceServiceArgs } from './get-device-service-args';

export const getDevicePublicKey = () => {

  const deviceLastCachedPublicKey = fetchDeviceCachedPublicKey();

  if (deviceLastCachedPublicKey !== undefined) {

    return deviceLastCachedPublicKey;
  }

  const deviceServiceArgs = getDeviceServiceArgs();

  const devicePublicKeyAsPem = fs.readFileSync(
    deviceServiceArgs.devicePublicKeyFilePath,
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
