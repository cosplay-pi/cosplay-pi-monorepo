import { retrieveArgs } from './retrieve-args';
import * as _ from './_';

import * as __ from './__';

export const updateRuntimeModuleSettingsAsync = async ({
  runtimeModuleName,
  runtimeModuleSettings,
}: {
  runtimeModuleName: string;
  runtimeModuleSettings: unknown;
}) => {
  
  const args = retrieveArgs();
  
  __.CostumeChipModule.writeSettingsFile({
    settingsFilePath: __.CostumeChipModule.getSettingsFilePath({
      name: runtimeModuleName,
      runtimePackageDirPath: args.runtimePackageDirPath,
    }),
    settings: runtimeModuleSettings,
  });
};
