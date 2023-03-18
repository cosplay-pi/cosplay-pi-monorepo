import { DeviceRuntimeModuleSettingsDef } from 'cosplay-pi-device-runtime-module-settings';

import { ExampleModuleSettings } from './example-module-settings';

export const exampleModuleSettingsDef: DeviceRuntimeModuleSettingsDef<ExampleModuleSettings> = {
  name: `cosplay-pi-example-module`,
  defaultSettings: {
    message: `Hello, world!`,
  },
};
