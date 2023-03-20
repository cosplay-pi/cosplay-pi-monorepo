export interface DeviceRuntimeConfig {
  modules: {
    [moduleName: string]: {
      versionRange: string;
    };
  };
};
