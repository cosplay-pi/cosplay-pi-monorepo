import * as _ from './_';

export const generateRuntimePackageInfo = ({
  config,
}: {
  config: _.Config,
}) => {

  const runtimePackageInfo = {
    dependencies: {},
  };

  for (const runtimeModuleName in config.runtimeModules) {

    const runtimeModuleConfig = config.runtimeModules[runtimeModuleName];

    Object.assign(
      runtimePackageInfo.dependencies,
      {
        [runtimeModuleName]: runtimeModuleConfig.version,
      },
    );
  }

  return runtimePackageInfo;
};
