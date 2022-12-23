import * as path from 'path';

export const getSettingsFilePath = ({
  name,
  runtimePackageDirPath,
}: {
  name: string;
  runtimePackageDirPath: string;
}) => {

  return path.resolve(
    runtimePackageDirPath,
    `${name}-settings.json`,
  );
};
