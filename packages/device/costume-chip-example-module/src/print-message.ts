import { fetchModuleSettings } from 'costume-chip-module-settings';

import { exampleModuleSettingsDef } from './example-module-settings-def';

export const printMessage = () => {

  const exampleModuleSettings = fetchModuleSettings({
    moduleSettingsDef: exampleModuleSettingsDef,
  });

  console.log(exampleModuleSettings.message);
};
