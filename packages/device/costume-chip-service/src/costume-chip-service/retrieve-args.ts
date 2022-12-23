import { fetchCachedArgs } from './cached-args';
import { getArgs } from './get-args';

export const retrieveArgs = () => {

  const cachedArgs = fetchCachedArgs();

  if (cachedArgs !== undefined) {

    return cachedArgs;
  }

  return getArgs();
};
