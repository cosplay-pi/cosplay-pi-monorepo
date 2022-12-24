import * as fs from 'fs';

import { getRuntimePackageDirPath } from 'costume-chip-module-base';
import { getModuleSettingsFilePath } from 'costume-chip-module-settings-foundation';

import { ModuleSettingsDef } from './module-settings-def';

export const fetchModuleSettings = <TModuleSettings>({
  moduleSettingsDef,
}: {
  moduleSettingsDef: ModuleSettingsDef<TModuleSettings>,
}) => {

  const runtimePackageDirPath = getRuntimePackageDirPath();

  const moduleSettingsFilePath = getModuleSettingsFilePath({
    moduleName: moduleSettingsDef.name,
    runtimePackageDirPath,
  });

  if (!fs.existsSync(moduleSettingsFilePath)) {

    return moduleSettingsDef.defaultSettings;
  }

  const moduleSettings = JSON.parse(
    fs.readFileSync(
      moduleSettingsFilePath,
      `utf8`,
    ),
  ) as TModuleSettings;

  return moduleSettings;
};
