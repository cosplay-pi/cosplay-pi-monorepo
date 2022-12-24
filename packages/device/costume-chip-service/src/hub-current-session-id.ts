import { $declareGlobal } from "./$declare-global";

export const [
  fetchHubCurrentSessionId,
  setHubCurrentSessionId,
] = $declareGlobal<string | undefined>(
  undefined,
);
