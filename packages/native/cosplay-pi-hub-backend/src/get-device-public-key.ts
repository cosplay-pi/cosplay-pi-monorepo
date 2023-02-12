import * as crypto from 'crypto';

export const getDevicePublicKey = ({
  devicePrivateKey,
}: {
  devicePrivateKey: crypto.KeyObject;
}) => {

  return crypto.createPublicKey(devicePrivateKey);
};
