import * as _ from './_';

import * as __ from './__';

export const printMessage = () => {

  const settings = __.CostumeChipModule.fetchSettings({
    settingsDef: _.settingsDef,
  });

  console.log(settings.message);
};
