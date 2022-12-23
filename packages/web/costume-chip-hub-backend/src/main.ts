import * as express from 'express';

import {
  CommandInfo,
  CommandType,
  InstallRuntimeCommandInfo,
  StartRuntimeCommandInfo,
  UpdateRuntimeModuleSettingsCommandInfo,
} from 'costume-chip-service-protocol/dist/costume-chip-service';

let mockCounter = 3;

let mockData: Array<CommandInfo> = [
  {
    id: 0,
    type: CommandType.InstallRuntime,
    runtimeConfig: {
      modules: {
        "costume-chip-example-module": {
          version: `link:../../packages/device/costume-chip-example-module`,
        },
      },
    },
  } as InstallRuntimeCommandInfo,
  {
    id: 1,
    type: CommandType.StartRuntime,
  } as StartRuntimeCommandInfo,
  {
    id: 2,
    type: CommandType.UpdateRuntimeModuleSettings,
    runtimeModuleName: `costume-chip-example-module`,
    runtimeModuleSettings: {
      message: `Today is ${new Date().toLocaleDateString()}`,
    },
  } as UpdateRuntimeModuleSettingsCommandInfo,
];

const app = express();

app.get(
  `/create-service-session`,
  (request, response) => {

    console.log(request.url);
    console.log(request.query);

    const deviceId = request.query[`device_id`] as string;

    console.log(deviceId);

    response.json({
      serviceSessionId: `${deviceId}-test-session`,
    });
  },
);

app.get(
  `/fetch-service-session-pending-commands-info`,
  (request, response) => {

    console.log(request.url);
    console.log(request.query);

    const serviceSessionId = request.query[`service_session_id`] as string;

    console.log(serviceSessionId);

    response.json(mockData);
  },
);

app.get(
  `/on-service-session-command-finished`,
  (request, response) => {

    console.log(request.url);
    console.log(request.query);

    const serviceSessionId = request.query[`service_session_id`] as string;
    const serviceSessionCommandId = parseInt(request.query[`service_session_command_id`] as string);

    console.log(serviceSessionId);
    console.log(serviceSessionCommandId);

    mockData = mockData.filter(
      (serviceSessionOtherCommand) => serviceSessionOtherCommand.id > serviceSessionCommandId,
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
      type: CommandType.UpdateRuntimeModuleSettings,
      runtimeModuleName: `costume-chip-example-module`,
      runtimeModuleSettings: {
        message: msg,
      },
    } as UpdateRuntimeModuleSettingsCommandInfo);

    response.json({});
  },
);

app.listen(4000, () => { });
