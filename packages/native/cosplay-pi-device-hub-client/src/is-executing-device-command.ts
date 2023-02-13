import { declareGlobal } from 'cosplay-pi-ts-core';

export const [
  fetchIsExecutingDeviceCommand,
  setIsExecutingDeviceCommand,
] = declareGlobal<boolean>(
  false,
);
