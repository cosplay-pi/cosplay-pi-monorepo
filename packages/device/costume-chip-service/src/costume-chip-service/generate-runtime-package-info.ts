import { Config } from "./config";

export const generateRuntimePackageInfo = ({
  config,
}: {
  config: Config,
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
