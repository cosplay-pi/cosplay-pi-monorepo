import { executeDeviceCommandAsync } from './execute-device-command-async';
import { createDeviceSessionAsync } from './create-device-session-async';
import { fetchDevicePendingCommandsInfoAsync } from './fetch-device-pending-commands-info-async';
import { fetchIsExecutingDeviceCommand } from './is-executing-device-command';

setInterval(() => { }, 1000);

(async () => {

  await createDeviceSessionAsync();

  while (true) {

    if (!fetchIsExecutingDeviceCommand()) {

      const devicePendingCommandsInfo = await fetchDevicePendingCommandsInfoAsync();

      const deviceFirstPendingCommandInfo = devicePendingCommandsInfo.find(() => true);

      if (deviceFirstPendingCommandInfo !== undefined) {

        await executeDeviceCommandAsync({
          deviceCommandInfo: deviceFirstPendingCommandInfo,
        });
      }
    }

    await new Promise((resolvePromise) => setTimeout(resolvePromise, 1000));
  }

})();
