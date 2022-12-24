import { executeDeviceCommandAsync } from './execute-device-command-async';
import { createHubSessionAsync } from './create-hub-session-async';
import { fetchCurrentSessionPendingCommandsAsync } from './fetch-current-session-pending-commands-async';
import { fetchIsExecutingDeviceCommand } from './is-executing-device-command';

setInterval(() => { }, 1000);

(async () => {

  await createHubSessionAsync();

  let currentSessionLastCommandId: number | undefined;

  while (true) {

    if (!fetchIsExecutingDeviceCommand()) {

      const currentSessionPendingCommands = await fetchCurrentSessionPendingCommandsAsync();

      const currentSessionPendingCommand = currentSessionPendingCommands.find(
        (x) => currentSessionLastCommandId === undefined || x.id > currentSessionLastCommandId,
      );

      if (currentSessionPendingCommand !== undefined) {

        currentSessionLastCommandId = currentSessionPendingCommand.id;

        await executeDeviceCommandAsync({
          deviceCommandInfo: currentSessionPendingCommand,
        });
      }
    }

    await new Promise((resolvePromise) => setTimeout(resolvePromise, 1000));
  }

})();
