import * as fs from 'fs';

import { Config } from './config';
import { retrieveArgs } from "./retrieve-args";

export const fetchConfig = (): Config => {

  const args = retrieveArgs();

  if (!fs.existsSync(args.configFilePath)) {

    return {
      runtimeModules: {},
    };
  }

  const config = JSON.parse(
    fs.readFileSync(
      args.configFilePath,
      `utf8`,
    ),
  );

  return config;
};
