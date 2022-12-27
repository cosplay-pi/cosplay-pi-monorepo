import { executeDeviceCommandAsync } from './execute-device-command-async';
import { createDeviceSessionAsync } from './create-device-session-async';
import { fetchDevicePendingCommandsInfoAsync } from './fetch-device-pending-commands-info-async';
import { fetchIsExecutingDeviceCommand } from './is-executing-device-command';

setInterval(() => { }, 1000);

(async () => {

  await createDeviceSessionAsync();

  let deviceLastCommandId: number | undefined;

  while (true) {

    if (!fetchIsExecutingDeviceCommand()) {

      const devicePendingCommandsInfo = await fetchDevicePendingCommandsInfoAsync();

      const deviceFirstPendingCommandInfo = devicePendingCommandsInfo.find(
        (x) => deviceLastCommandId === undefined || x.id > deviceLastCommandId,
      );

      if (deviceFirstPendingCommandInfo !== undefined) {

        deviceLastCommandId = deviceFirstPendingCommandInfo.id;

        await executeDeviceCommandAsync({
          deviceCommandInfo: deviceFirstPendingCommandInfo,
        });
      }
    }

    await new Promise((resolvePromise) => setTimeout(resolvePromise, 1000));
  }

})();
