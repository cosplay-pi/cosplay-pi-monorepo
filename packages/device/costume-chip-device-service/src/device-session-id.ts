import { $declareGlobal } from "./$declare-global";

export const [
  fetchDeviceSessionId,
  setDeviceSessionId,
] = $declareGlobal<string | undefined>(
  undefined,
);
