import { declareGlobal } from 'cosplay-pi-ts-core';

export const [
  fetchExecuteDeviceCommandTaskState,
  setExecuteDeviceCommandTaskState,
] = declareGlobal<{} | undefined>(
  undefined,
);
