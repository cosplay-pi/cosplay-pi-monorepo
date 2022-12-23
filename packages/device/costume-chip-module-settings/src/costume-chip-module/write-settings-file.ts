import * as fs from 'fs';

export const writeSettingsFile = <TSettings>({
  settingsFilePath,
  settings,
}: {
  settingsFilePath: string,
  settings: TSettings,
}) => {

  const settingsAsJson = JSON.stringify(
    settings,
    undefined,
    2,
  );

  fs.writeFileSync(
    settingsFilePath,
    settingsAsJson,
    `utf8`,
  );
};
