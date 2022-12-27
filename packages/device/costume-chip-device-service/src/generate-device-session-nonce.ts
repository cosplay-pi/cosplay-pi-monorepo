import * as crypto from 'crypto';

export const generateDeviceSessionNonce = () => {

  return crypto.randomBytes(8).toString(`base64`);
};
