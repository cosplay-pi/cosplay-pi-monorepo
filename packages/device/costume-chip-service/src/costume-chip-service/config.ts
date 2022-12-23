export interface Config {
  runtimeModules: {
    [runtimeModuleName: string]: {
      version: string;
    };
  };
};
