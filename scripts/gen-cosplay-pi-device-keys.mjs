import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

const {
  privateKey,
  publicKey,
} = crypto.generateKeyPairSync(
  `rsa`,
  {
    modulusLength: 512,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'jwk',
    },
  },
);

let cosplayPiDeviceHubRegisterUrl = 'http://localhost:3000/register-active-user-device?';

for (const privateKeyPropertyName in privateKey) {

  cosplayPiDeviceHubRegisterUrl +=
    `${privateKeyPropertyName}=${encodeURIComponent(privateKey[privateKeyPropertyName])}&`;
}

fs.writeFileSync(
  path.resolve(
    `..`,
    `obj`,
    `cosplay-pi-device-public-key.pem`,
  ),
  publicKey,
  `utf-8`,
);

fs.writeFileSync(
  path.resolve(
    `..`,
    `obj`,
    `cosplay-pi-device-hub-register-url.txt`,
  ),
  cosplayPiDeviceHubRegisterUrl,
  `utf-8`,
);

console.log(cosplayPiDeviceHubRegisterUrl);
