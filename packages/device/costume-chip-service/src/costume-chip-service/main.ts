import * as _ from './_';

import * as __ from './__';

import { executeCommandAsync } from './execute-command-async';
import { createHubSessionAsync } from './create-hub-session-async';
import { fetchCurrentSessionPendingCommandsAsync } from './fetch-current-session-pending-commands-async';
import { fetchIsExecutingCommand } from './is-executing-command';

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

  await createHubSessionAsync();

  let currentSessionLastCommandId: number | undefined;

  while (true) {

    if (!fetchIsExecutingCommand()) {

      const currentSessionPendingCommands = await fetchCurrentSessionPendingCommandsAsync();

      const currentSessionPendingCommand = currentSessionPendingCommands.find(
        (x) => currentSessionLastCommandId === undefined || x.id > currentSessionLastCommandId,
      );

      if (currentSessionPendingCommand !== undefined) {

        currentSessionLastCommandId = currentSessionPendingCommand.id;

        await executeCommandAsync({
          commandInfo: currentSessionPendingCommand,
        });
      }
    }

    await new Promise((resolvePromise) => setTimeout(resolvePromise, 1000));
  }

})();
