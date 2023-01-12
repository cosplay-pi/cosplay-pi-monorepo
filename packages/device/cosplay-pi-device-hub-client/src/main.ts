import { createAndVerifyDeviceSessionAsync } from './create-and-verify-device-session-async';
import { executeDeviceSessionCommandAsync } from './execute-device-session-command-async';
import { fetchDeviceSessionNextPendingCommandInfoAsync } from './fetch-device-session-next-pending-command-info-async';
import { waitAsync } from './wait_async';

setInterval(() => {}, 1000);

(async () => {

  while (true) {

    try {

      console.log(`Creating new device session...`);

      const { deviceSessionInfo } = await createAndVerifyDeviceSessionAsync();

      console.log(`New device session: ${deviceSessionInfo.id}`);

      while (true) {

        const deviceSessionNextPendingCommandInfo =
          await fetchDeviceSessionNextPendingCommandInfoAsync({
            deviceSessionInfo,
          });

        if (deviceSessionNextPendingCommandInfo !== undefined) {

          console.log(`Executing next pending device session command (${deviceSessionNextPendingCommandInfo.id})...`);

          await executeDeviceSessionCommandAsync({
            deviceSessionInfo,
            deviceSessionCommandInfo: deviceSessionNextPendingCommandInfo,
          });

          console.log(`Device session command executed.`);

        }

        await waitAsync({ milliseconds: 5000 });
      }

    } catch (e) {

      console.log(e);

    } finally {

      await waitAsync({ milliseconds: 5000 });
    }
  }

})();
