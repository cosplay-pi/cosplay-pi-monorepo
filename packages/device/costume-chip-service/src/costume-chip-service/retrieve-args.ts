import * as _ from './_';

export const retrieveArgs = () => {

  const cachedArgs = _.fetchCachedArgs();

  if (cachedArgs !== undefined) {

    return cachedArgs;
  }

  return _.getArgs();
};
