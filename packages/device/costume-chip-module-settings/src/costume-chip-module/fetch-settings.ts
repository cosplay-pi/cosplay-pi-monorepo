import * as fs from 'fs';

import * as _ from './_';

export const fetchSettings = <TSettings>({
  settingsDef,
}: {
  settingsDef: _.SettingsDef<TSettings>,
}) => {

  const runtimePackageDirPath = _.getRuntimePackageDirPath();

  const settingsFilePath = _.getSettingsFilePath({
    name: settingsDef.name,
    runtimePackageDirPath,
  });

  if (!fs.existsSync(settingsFilePath)) {

    return settingsDef.defaultSettings;
  }

  const settings = JSON.parse(
    fs.readFileSync(
      settingsFilePath,
      `utf8`,
    ),
  ) as TSettings;

  return settings;
};
