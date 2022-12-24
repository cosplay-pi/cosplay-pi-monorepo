import * as express from 'express';

import {
  ServiceCommandInfo,
  ServiceCommandType,
  ServiceInstallRuntimeCommandInfo,
  ServiceStartRuntimeCommandInfo,
  ServiceUpdateModuleSettingsCommandInfo,
} from 'costume-chip-service-protocol';

let mockCounter = 3;

let mockData: Array<ServiceCommandInfo> = [
  {
    id: 0,
    type: ServiceCommandType.InstallRuntime,
    runtimeConfig: {
      modules: {
        "costume-chip-example-module": {
          version: `link:../../packages/device/costume-chip-example-module`,
        },
      },
    },
  } as ServiceInstallRuntimeCommandInfo,
  {
    id: 1,
    type: ServiceCommandType.StartRuntime,
  } as ServiceStartRuntimeCommandInfo,
  {
    id: 2,
    type: ServiceCommandType.UpdateModuleSettings,
    moduleName: `costume-chip-example-module`,
    moduleSettings: {
      message: `Today is ${new Date().toLocaleDateString()}`,
    },
  } as ServiceUpdateModuleSettingsCommandInfo,
];

const app = express();

app.get(
  `/create-session`,
  (request, response) => {

    console.log(request.url);
    console.log(request.query);

    const deviceId = request.query[`device_id`] as string;

    console.log(deviceId);

    response.json({
      sessionId: `${deviceId}-test-session`,
    });
  },
);

app.get(
  `/fetch-service-pending-commands-info`,
  (request, response) => {

    console.log(request.url);
    console.log(request.query);

    const sessionId = request.query[`session_id`] as string;

    console.log(sessionId);

    response.json(mockData);
  },
);

app.get(
  `/on-service-command-finished`,
  (request, response) => {

    console.log(request.url);
    console.log(request.query);

    const sessionId = request.query[`session_id`] as string;
    const serviceCommandId = parseInt(request.query[`service_command_id`] as string);

    console.log(sessionId);
    console.log(serviceCommandId);

    mockData = mockData.filter(
      (serviceOtherCommand) => serviceOtherCommand.id > serviceCommandId,
    );

    response.json({});
  },
);

app.get(
  `/test`,
  (request, response) => {

    console.log(request.url);
    console.log(request.query);

    const msg = request.query[`msg`] as string;

    mockData.push({
      id: mockCounter++,
      type: ServiceCommandType.UpdateModuleSettings,
      moduleName: `costume-chip-example-module`,
      moduleSettings: {
        message: msg,
      },
    } as ServiceUpdateModuleSettingsCommandInfo);

    response.json({});
  },
);

app.listen(4000, () => { });
