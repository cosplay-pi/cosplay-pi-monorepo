import * as fs from 'fs';
import * as path from 'path';

export const rootDirPath = path.resolve(`root`);

export const createRootDirIfDoesNotExist = () => {

  if (!fs.existsSync(rootDirPath)) {

    fs.mkdirSync(
      rootDirPath,
      {
        recursive: true,
      },
    );
  }
};
