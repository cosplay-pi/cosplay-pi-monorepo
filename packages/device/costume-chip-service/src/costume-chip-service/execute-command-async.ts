import * as _ from './_';

import { installRuntimeAsync } from './install-runtime-async';
import { startRuntimeAsync } from './start-runtime-async';
import { stopRuntimeAsync } from './stop-runtime-async';

export const executeCommandAsync = async ({
  commandInfo,
}: {
  commandInfo: _.CommandInfo;
}) => {

  if (commandInfo.type === _.CommandType.InstallRuntime) {

    const installRuntimeCommandInfo = commandInfo as _.InstallRuntimeCommandInfo;

    await installRuntimeAsync({
      runtimeConfig: installRuntimeCommandInfo.runtimeConfig,
    });

  } else if (commandInfo.type === _.CommandType.StartRuntime) {

    await startRuntimeAsync();

  } else if (commandInfo.type === _.CommandType.StopRuntime) {

    await stopRuntimeAsync();

  } else if (commandInfo.type === _.CommandType.UpdateRuntimeModuleSettings) {

    // TODO:
  }
};
