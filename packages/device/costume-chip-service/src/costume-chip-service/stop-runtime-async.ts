import * as kill from 'tree-kill';

import * as _ from './_';

export const stopRuntimeAsync = async () => {

  const lastRuntimeProcess = _.fetchRuntimeProcess();

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

  _.setRuntimeProcess(undefined);
};
