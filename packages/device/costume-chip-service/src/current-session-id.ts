import { $declareGlobal } from "./$declare-global";

export const [
  fetchCurrentSessionId,
  setCurrentSessionId,
] = $declareGlobal<string | undefined>(
  undefined,
);
