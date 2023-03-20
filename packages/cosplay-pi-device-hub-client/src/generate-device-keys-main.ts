import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

import {
  devicePublicKeyFilePath,
  hubFrontendUrl,
} from './env';

const {
  privateKey: devicePrivateKeyAsJwk,
  publicKey: devicePublicKeyAsPem,
} = crypto.generateKeyPairSync(
  // @ts-expect-error
  `rsa`,
  {
    modulusLength: 512,
    publicKeyEncoding: {
      type: `spki`,
      format: `pem`,
    },
    privateKeyEncoding: {
      type: `pkcs1`,
      format: `jwk`,
    },
  },
);

let hubFrontendRegisterDeviceUrl = `${hubFrontendUrl}/my-devices/register?`;

for (const devicePrivateKeyAsJwkFieldName in devicePrivateKeyAsJwk) {

  hubFrontendRegisterDeviceUrl +=
    `${devicePrivateKeyAsJwkFieldName}=${encodeURIComponent(devicePrivateKeyAsJwk[devicePrivateKeyAsJwkFieldName])}&`;
}

fs.mkdirSync(
  path.dirname(devicePublicKeyFilePath),
  {
    recursive: true,
  },
);

fs.writeFileSync(
  devicePublicKeyFilePath,
  devicePublicKeyAsPem,
  `utf-8`,
);

console.log(hubFrontendRegisterDeviceUrl);
