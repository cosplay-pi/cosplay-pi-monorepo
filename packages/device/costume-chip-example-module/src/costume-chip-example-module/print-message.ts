import * as __ from './__';

import { settingsDef } from './settings-def';

export const printMessage = () => {

  const settings = __.CostumeChipModule.fetchSettings({
    settingsDef: settingsDef,
  });

  console.log(settings.message);
};
