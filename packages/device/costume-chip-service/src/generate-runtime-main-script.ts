import { RuntimeConfig } from "costume-chip-service-protocol";

export const generateRuntimeMainScript = ({
  runtimeConfig,
}: {
  runtimeConfig: RuntimeConfig,
}) => {

  let runtimeMainScript = `setInterval(() => console.log('Hi'), 1000);\n`;

  for (const moduleName in runtimeConfig.modules) {

    runtimeMainScript += `require('${moduleName}');\n`;
  }

  return runtimeMainScript;
};
