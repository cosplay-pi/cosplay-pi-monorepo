import * as crypto from 'crypto';

export const generateDeviceSessionAccessToken = () => {

  return crypto.randomBytes(32).toString(`base64url`);
};
