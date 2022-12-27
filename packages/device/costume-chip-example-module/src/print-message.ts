import { fetchDeviceRuntimeModuleSettings } from 'costume-chip-module-settings';

import { exampleModuleSettingsDef } from './example-module-settings-def';

export const printMessage = () => {

  const exampleModuleSettings = fetchDeviceRuntimeModuleSettings({
    deviceRuntimeModuleSettingsDef: exampleModuleSettingsDef,
  });

  console.log(exampleModuleSettings.message);
};
