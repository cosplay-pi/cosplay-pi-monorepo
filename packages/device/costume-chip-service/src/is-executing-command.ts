import { $declareGlobal } from './$declare-global';

export const [
  fetchIsExecutingCommand,
  setIsExecutingCommand,
] = $declareGlobal<boolean>(
  false,
);
