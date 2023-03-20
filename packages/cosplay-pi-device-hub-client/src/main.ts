import {
  fetchDeviceSessionNextPendingCommandInfo,
  onDeviceRuntimeStateChanged,
  setHubBackendClientConfig,
} from 'cosplay-pi-hub-backend-client';

import { createAndVerifyDeviceSession } from './create-and-verify-device-session';
import { hubBackendUrl } from './env';
import { executeDeviceSessionCommand } from './execute-device-session-command';
import { fetchDeviceRuntimeState } from './fetch-device-runtime-state';
import { getDeviceId } from './get-device-id';
import { startDeviceRuntime } from './start-device-runtime';
import { wait } from './wait';

const deviceId = getDeviceId();

setHubBackendClientConfig({
  hubBackendUrl,
});

(async () => {

  try {

    console.log(`Starting device runtime...`);

    await startDeviceRuntime();

    console.log(`Device runtime started.`);

  } catch (e) {

    console.log(e);
  }

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

        } else {

          const deviceRuntimeState = fetchDeviceRuntimeState();

          await onDeviceRuntimeStateChanged({
            deviceId,
            deviceActiveSessionAccessToken: deviceSessionInfo.accessToken,
            deviceRuntimeState,
          });

          await wait({ milliseconds: 5000 });
        }
      }

    } catch (e) {

      console.log(e);

    } finally {

      await wait({ milliseconds: 5000 });
    }
  }

})();
