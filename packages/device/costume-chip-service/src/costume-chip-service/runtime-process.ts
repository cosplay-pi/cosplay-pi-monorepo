import { ChildProcess } from "child_process";

import { $declareGlobal } from "../$declare-global";

export const [
  fetchRuntimeProcess,
  setRuntimeProcess,
] = $declareGlobal<ChildProcess | undefined>(
  undefined,
);
