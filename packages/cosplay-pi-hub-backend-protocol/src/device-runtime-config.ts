export interface DeviceRuntimeConfig {
  modules: {
    [moduleName: string]: {
      version: string;
    };
  };
};
