import {
  fetchDeviceSessionNextPendingCommandInfo,
  setHubBackendClientConfig,
} from 'cosplay-pi-hub-backend-client';

import { createAndVerifyDeviceSession } from './create-and-verify-device-session';
import { executeDeviceSessionCommand } from './execute-device-session-command';
import { wait } from './wait';

setHubBackendClientConfig({
  hubBackendUrl: `http://localhost:4000`,
});

(async () => {

  while (true) {

    try {

      console.log(`Creating new device session...`);

      const { deviceSessionInfo } = await createAndVerifyDeviceSession();

      console.log(`New device session: ${deviceSessionInfo.id}`);

      while (true) {

        const deviceSessionNextPendingCommandInfo =
          await fetchDeviceSessionNextPendingCommandInfo({
            deviceSessionId: deviceSessionInfo.id,
            deviceSessionAccessToken: deviceSessionInfo.accessToken,
          });

        if (deviceSessionNextPendingCommandInfo !== undefined) {

          console.log(`Executing next pending device session command (${deviceSessionNextPendingCommandInfo.id})...`);

          await executeDeviceSessionCommand({
            deviceSessionInfo,
            deviceSessionCommandInfo: deviceSessionNextPendingCommandInfo,
          });

          console.log(`Device session command executed.`);

        }

        await wait({ milliseconds: 5000 });
      }

    } catch (e) {

      console.log(e);

    } finally {

      await wait({ milliseconds: 5000 });
    }
  }

})();
