import { ChildProcess } from "child_process";

import { $declareGlobal } from "./$declare-global";

export const [
  fetchDeviceRuntimeProcess,
  setDeviceRuntimeProcess,
] = $declareGlobal<ChildProcess | undefined>(
  undefined,
);
