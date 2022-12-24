import fetch from 'node-fetch';

import { ServiceCommandInfo, ServiceCommandType, ServiceInstallRuntimeCommandInfo, ServiceUpdateModuleSettingsCommandInfo } from 'costume-chip-service-protocol';

import { installRuntimeAsync } from './install-runtime-async';
import { startRuntimeAsync } from './start-runtime-async';
import { stopRuntimeAsync } from './stop-runtime-async';
import { fetchIsExecutingCommand, setIsExecutingCommand } from './is-executing-command';
import { hubBackendUrl } from './hub-backend-url';
import { fetchHubCurrentSessionId } from './hub-current-session-id';
import { updateModuleSettingsAsync } from './update-module-settings-async';

export const executeCommandAsync = async ({
  serviceCommandInfo,
}: {
  serviceCommandInfo: ServiceCommandInfo;
}) => {

  if (fetchIsExecutingCommand()) {

    throw new Error();
  }

  const hubCurrentSessionId = fetchHubCurrentSessionId();

  try {

    setIsExecutingCommand(true);

    try {

      if (serviceCommandInfo.type === ServiceCommandType.InstallRuntime) {

        const serviceInstallRuntimeCommandInfo =
          serviceCommandInfo as ServiceInstallRuntimeCommandInfo;

        await installRuntimeAsync({
          runtimeConfig: serviceInstallRuntimeCommandInfo.runtimeConfig,
        });

      } else if (serviceCommandInfo.type === ServiceCommandType.StartRuntime) {

        await startRuntimeAsync();

      } else if (serviceCommandInfo.type === ServiceCommandType.StopRuntime) {

        await stopRuntimeAsync();

      } else if (serviceCommandInfo.type === ServiceCommandType.UpdateModuleSettings) {

        const serviceUpdateModuleSettingsCommandInfo =
          serviceCommandInfo as ServiceUpdateModuleSettingsCommandInfo;

        await updateModuleSettingsAsync({
          moduleName: serviceUpdateModuleSettingsCommandInfo.moduleName,
          moduleSettings: serviceUpdateModuleSettingsCommandInfo.moduleSettings,
        });
      }

    } finally {

      await fetch(`${hubBackendUrl}/on-command-finished?session_id=${hubCurrentSessionId}&command_id=${serviceCommandInfo.id}`);
    }

  } finally {

    setIsExecutingCommand(false);
  }
};
