import { Config } from "./config";

export const generateRuntimePackageInfo = ({
  config,
}: {
  config: Config,
}) => {

  const runtimePackageInfo = {
    dependencies: {},
  };

  for (const runtimeModuleName in config.runtime.modules) {

    const runtimeModuleConfig = config.runtime.modules[runtimeModuleName];

    Object.assign(
      runtimePackageInfo.dependencies,
      {
        [runtimeModuleName]: runtimeModuleConfig.version,
      },
    );
  }

  return runtimePackageInfo;
};
