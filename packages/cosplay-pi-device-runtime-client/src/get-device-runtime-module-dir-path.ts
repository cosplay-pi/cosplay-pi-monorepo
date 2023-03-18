import * as path from 'path';

export const getDeviceRuntimeModuleDirPath = ({
  deviceRuntimeDirPath,
  deviceRuntimeModuleName,
}: {
  deviceRuntimeDirPath: string;
  deviceRuntimeModuleName: string;
}) => {

  return path.resolve(
    deviceRuntimeDirPath,
    `node_modules`,
    deviceRuntimeModuleName,
  );
};
