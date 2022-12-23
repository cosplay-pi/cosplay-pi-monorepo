import * as _ from './_';

export const printMessage = () => {

  const settings = _.fetchSettings({
    settingsDef: _.settingsDef,
  });

  console.log(settings.message);
};
