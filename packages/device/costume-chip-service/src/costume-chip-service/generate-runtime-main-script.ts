import * as _ from './_';

export const generateRuntimeMainScript = ({
  runtimeConfig,
}: {
  runtimeConfig: _.RuntimeConfig,
}) => {

  let runtimeMainScript = `setInterval(() => console.log('Hi'), 1000);\n`;

  for (const runtimeModuleName in runtimeConfig.modules) {

    runtimeMainScript += `require('${runtimeModuleName}');\n`;
  }

  return runtimeMainScript;
};
