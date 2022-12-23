import * as _ from './_';

import * as __ from './__';

import { executeCommandAsync } from './execute-command-async';
import { fetchConfig } from './fetch-config';

setInterval(() => { }, 1000);

Object.assign(
  globalThis,
  {
    CostumeChipService: {
      ..._,
      executeCommandAsync,
    },
    CostumeChipModule: __.CostumeChipModule,
  },
);

(async () => {

  await executeCommandAsync({
    commandInfo: {
      id: 0,
      type: _.CommandType.InstallRuntime,
      runtimeConfig: fetchConfig().runtime,
    } as _.InstallRuntimeCommandInfo,
  });

  await executeCommandAsync({
    commandInfo: {
      id: 1,
      type: _.CommandType.StartRuntime,
    } as _.StartRuntimeCommandInfo,
  });

})();
