export interface RuntimeConfig {
  modules: {
    [moduleName: string]: {
      version: string;
    };
  };
};
