import * as crypto from 'crypto';

import { fetchDeviceCachedId, setDeviceCachedId } from './device-cached-id';
import { getDevicePublicKey } from './get-device-public-key';

export const getDeviceId = () => {

  const deviceLastCachedId = fetchDeviceCachedId();

  if (deviceLastCachedId !== undefined) {

    return deviceLastCachedId;
  }

  const devicePublicKey = getDevicePublicKey();

  const devicePublicKeyAsDer = devicePublicKey.export({
    type: `spki`,
    format: `der`,
  });

  const deviceId = crypto
    .createHash(`md5`)
    .update(devicePublicKeyAsDer)
    .digest(`hex`);
  
  setDeviceCachedId(deviceId);

  return deviceId;
};
