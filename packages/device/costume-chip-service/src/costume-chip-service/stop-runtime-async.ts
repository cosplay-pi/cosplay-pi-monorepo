import * as kill from 'tree-kill';

import { fetchRuntimeProcess, setRuntimeProcess } from "./runtime-process";

export const stopRuntimeAsync = async () => {

  const lastRuntimeProcess = fetchRuntimeProcess();

  if (lastRuntimeProcess === undefined) {

    throw new Error();
  }

  if (lastRuntimeProcess.pid !== undefined) {

    const lastRuntimeProcessId = lastRuntimeProcess.pid;

    await new Promise<void>((resolvePromise, rejectPromise) => {

      kill(
        lastRuntimeProcessId,
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

  setRuntimeProcess(undefined);
};
