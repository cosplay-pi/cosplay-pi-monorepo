import * as _ from './_';

export const generateRuntimeMainScript = ({
  config,
}: {
  config: _.Config,
}) => {

  let runtimeMainScript = `setInterval(() => console.log('Hi'), 1000);\n`;

  for (const runtimeModuleName in config.runtimeModules) {

    runtimeMainScript += `require('${runtimeModuleName}');\n`;
  }

  return runtimeMainScript;
};
