import * as _ from './_';

export const generateRuntimePackageInfo = ({
  runtimeConfig,
}: {
  runtimeConfig: _.RuntimeConfig,
}) => {

  const runtimePackageInfo = {
    dependencies: {},
  };

  for (const runtimeModuleName in runtimeConfig.modules) {

    const runtimeModuleConfig = runtimeConfig.modules[runtimeModuleName];

    Object.assign(
      runtimePackageInfo.dependencies,
      {
        [runtimeModuleName]: runtimeModuleConfig.version,
      },
    );
  }

  return runtimePackageInfo;
};
