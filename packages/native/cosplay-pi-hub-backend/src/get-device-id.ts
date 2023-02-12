import * as crypto from 'crypto';

export const getDeviceId = ({
  devicePublicKey,
}: {
  devicePublicKey: crypto.KeyObject;
}) => {

  const devicePublicKeyAsDer = devicePublicKey.export({
    type: `spki`,
    format: `der`,
  });

  return crypto.createHash(`md5`).update(devicePublicKeyAsDer).digest(`hex`);
};
