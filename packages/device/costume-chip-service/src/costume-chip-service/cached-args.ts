import { $declareGlobal } from "../$declare-global";

import { Args } from "./args";

export const [
  fetchCachedArgs,
  setCachedArgs,
] = $declareGlobal<Args | undefined>(
  undefined,
);
