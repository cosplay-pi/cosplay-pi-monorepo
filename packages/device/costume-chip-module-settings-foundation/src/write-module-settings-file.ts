import * as fs from 'fs';

export const writeModuleSettingsFile = <TModuleSettings>({
  moduleSettingsFilePath,
  moduleSettings,
}: {
  moduleSettingsFilePath: string,
  moduleSettings: TModuleSettings,
}) => {

  const moduleSettingsAsJson = JSON.stringify(
    moduleSettings,
    undefined,
    2,
  );

  fs.writeFileSync(
    moduleSettingsFilePath,
    moduleSettingsAsJson,
    `utf8`,
  );
};
