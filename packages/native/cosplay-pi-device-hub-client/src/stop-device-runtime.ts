import * as kill from 'tree-kill';

import {
  fetchDeviceRuntimeProcess,
  setDeviceRuntimeProcess,
} from './device-runtime-process';

export const stopDeviceRuntime = async () => {

  const deviceRuntimeLastProcess = fetchDeviceRuntimeProcess();

  if (deviceRuntimeLastProcess === undefined) {

    throw new Error();
  }

  try {

    if (deviceRuntimeLastProcess.pid !== undefined) {

      const deviceRuntimeLastProcessId = deviceRuntimeLastProcess.pid;

      await new Promise<void>((resolvePromise, rejectPromise) => {

        kill(
          deviceRuntimeLastProcessId,
          (error) => {

            if (error !== null && error !== undefined) {

              rejectPromise(error);

            } else {

              resolvePromise();
            }
          },
        );
      });
    }

  } finally {

    setDeviceRuntimeProcess(undefined);
  }
};
