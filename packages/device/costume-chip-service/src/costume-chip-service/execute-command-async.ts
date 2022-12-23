import fetch from 'node-fetch';

import * as _ from './_';

import { installRuntimeAsync } from './install-runtime-async';
import { startRuntimeAsync } from './start-runtime-async';
import { stopRuntimeAsync } from './stop-runtime-async';
import { fetchIsExecutingCommand, setIsExecutingCommand } from './is-executing-command';
import { hubBackendUrl } from './hub-backend-url';
import { fetchHubCurrentSessionId } from './hub-current-session-id';
import { updateRuntimeModuleSettingsAsync } from './update-runtime-module-settings-async';

export const executeCommandAsync = async ({
  commandInfo,
}: {
  commandInfo: _.CommandInfo;
}) => {

  if (fetchIsExecutingCommand()) {

    throw new Error();
  }

  const hubCurrentSessionId = fetchHubCurrentSessionId();

  try {

    setIsExecutingCommand(true);

    try {

      if (commandInfo.type === _.CommandType.InstallRuntime) {

        const installRuntimeCommandInfo =
          commandInfo as _.InstallRuntimeCommandInfo;

        await installRuntimeAsync({
          runtimeConfig: installRuntimeCommandInfo.runtimeConfig,
        });

      } else if (commandInfo.type === _.CommandType.StartRuntime) {

        await startRuntimeAsync();

      } else if (commandInfo.type === _.CommandType.StopRuntime) {

        await stopRuntimeAsync();

      } else if (commandInfo.type === _.CommandType.UpdateRuntimeModuleSettings) {

        const updateRuntimeModuleSettingsCommandInfo =
          commandInfo as _.UpdateRuntimeModuleSettingsCommandInfo;

        await updateRuntimeModuleSettingsAsync({
          runtimeModuleName: updateRuntimeModuleSettingsCommandInfo.runtimeModuleName,
          runtimeModuleSettings: updateRuntimeModuleSettingsCommandInfo.runtimeModuleSettings,
        });
      }

    } finally {

      await fetch(`${hubBackendUrl}/on-service-session-command-finished?service_session_id=${hubCurrentSessionId}&service_session_command_id=${commandInfo.id}`);
    }

  } finally {

    setIsExecutingCommand(false);
  }
};
