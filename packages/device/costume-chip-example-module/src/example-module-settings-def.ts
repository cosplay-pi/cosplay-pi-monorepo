import { ModuleSettingsDef } from 'costume-chip-module-settings';

import { ExampleModuleSettings } from './example-module-settings';

export const exampleModuleSettingsDef: ModuleSettingsDef<ExampleModuleSettings> = {
  name: `costume-chip-example-module`,
  defaultSettings: {
    message: `Hello, world!`,
  },
};
