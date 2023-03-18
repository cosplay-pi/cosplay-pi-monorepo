import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

import {
  createRootDirIfDoesNotExist,
  rootDirPath,
} from './root-dir';

createRootDirIfDoesNotExist();

const {
  privateKey,
  publicKey,
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

let hubRegisterUrl = `http://localhost:3000/my-devices/register?`;

for (const privateKeyPropertyName in privateKey) {

  hubRegisterUrl +=
    `${privateKeyPropertyName}=${encodeURIComponent(privateKey[privateKeyPropertyName])}&`;
}

fs.writeFileSync(
  path.resolve(
    rootDirPath,
    `public-key.pem`,
  ),
  publicKey,
  `utf-8`,
);

fs.writeFileSync(
  path.resolve(
    rootDirPath,
    `hub-register-url.txt`,
  ),
  hubRegisterUrl,
  `utf-8`,
);

console.log(hubRegisterUrl);
