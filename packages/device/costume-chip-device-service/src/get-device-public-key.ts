import * as fs from 'fs';
import * as crypto from 'crypto';

import { getDeviceServiceArgs } from './get-device-service-args';

export const getDevicePublicKey = () => {

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

  return devicePublicKey;
};
