import { declareGlobal } from './declare-global';

export const [
  fetchIsExecutingDeviceCommand,
  setIsExecutingDeviceCommand,
] = declareGlobal<boolean>(
  false,
);
