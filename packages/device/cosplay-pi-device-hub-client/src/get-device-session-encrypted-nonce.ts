import * as crypto from 'crypto';

import { getDevicePublicKey } from "./get-device-public-key";

export const getDeviceSessionEncryptedNonce = ({
  deviceSessionNonce,
}: {
  deviceSessionNonce: string;
}) => {

  const devicePublicKey = getDevicePublicKey();

  const deviceSessionEncryptedNonceAsBytes = crypto.publicEncrypt(
    {
      key: devicePublicKey,
    },
    Buffer.from(deviceSessionNonce, `utf-8`),
  );

  return deviceSessionEncryptedNonceAsBytes.toString(`base64`);
};
