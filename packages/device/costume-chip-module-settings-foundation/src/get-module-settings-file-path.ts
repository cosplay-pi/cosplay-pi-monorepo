import * as path from 'path';

export const getModuleSettingsFilePath = ({
  moduleName,
  runtimePackageDirPath,
}: {
  moduleName: string;
  runtimePackageDirPath: string;
}) => {

  return path.resolve(
    runtimePackageDirPath,
    `${moduleName}-settings.json`,
  );
};
