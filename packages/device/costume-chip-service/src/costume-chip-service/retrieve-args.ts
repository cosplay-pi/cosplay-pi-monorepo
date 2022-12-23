import { fetchCachedArgs } from './cached-args';
import { fetchArgs } from './fetch-args';

export const retrieveArgs = () => {

  const cachedArgs = fetchCachedArgs();

  if (cachedArgs !== undefined) {

    return cachedArgs;
  }

  return fetchArgs();
};
