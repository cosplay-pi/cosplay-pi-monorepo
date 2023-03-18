import * as kill from 'tree-kill';

import {
  fetchDeviceRuntimeProcess,
  setDeviceRuntimeProcess,
} from './device-runtime-process';

export const stopDeviceRuntime = async () => {

  const deviceRuntimeProcess = fetchDeviceRuntimeProcess();

  if (deviceRuntimeProcess === undefined) {

    throw new Error();
  }

  try {

    if (deviceRuntimeProcess.pid !== undefined) {

      const deviceRuntimeProcessId = deviceRuntimeProcess.pid;

      await new Promise<void>((resolvePromise, rejectPromise) => {

        kill(
          deviceRuntimeProcessId,
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
