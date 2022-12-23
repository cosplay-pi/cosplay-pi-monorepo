import { ChildProcess } from "child_process";

import * as __ from './__';

export const [
  fetchRuntimeProcess,
  setRuntimeProcess,
] = __.$declareGlobal<ChildProcess | undefined>(
  undefined,
);
