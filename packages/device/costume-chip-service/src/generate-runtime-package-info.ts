import { RuntimeConfig } from "costume-chip-service-protocol";

export const generateRuntimePackageInfo = ({
  runtimeConfig,
}: {
  runtimeConfig: RuntimeConfig,
}) => {

  const runtimePackageInfo = {
    dependencies: {},
  };

  for (const moduleName in runtimeConfig.modules) {

    const moduleConfig = runtimeConfig.modules[moduleName];

    Object.assign(
      runtimePackageInfo.dependencies,
      {
        [moduleName]: moduleConfig.version,
      },
    );
  }

  return runtimePackageInfo;
};
