import { declareGlobal } from 'cosplay-pi-ts-core';

export const [
  fetchDeviceRuntimeInstallTaskState,
  setDeviceRuntimeInstallTaskState,
] = declareGlobal<{} | undefined>(
  undefined,
);
