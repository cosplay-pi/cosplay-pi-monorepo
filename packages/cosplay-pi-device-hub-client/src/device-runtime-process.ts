import { ChildProcess } from "child_process";

import { declareGlobal } from "cosplay-pi-ts-core";

export const [
  fetchDeviceRuntimeProcess,
  setDeviceRuntimeProcess,
] = declareGlobal<ChildProcess | undefined>(
  undefined,
);
