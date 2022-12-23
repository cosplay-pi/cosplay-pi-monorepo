import * as __ from './__';

import { Settings } from './settings';

export const settingsDef: __.CostumeChipModule.SettingsDef<Settings> = {
  name: `costume-chip-example-module`,
  defaultSettings: {
    message: `Hello, world!`,
  },
};
