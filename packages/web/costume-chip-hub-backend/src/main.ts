import * as express from 'express';

import {
  DeviceCommandInfo,
  DeviceCommandType,
  DeviceInstallRuntimeCommandInfo,
  DeviceStartRuntimeCommandInfo,
  DeviceUpdateRuntimeModuleSettingsCommandInfo,
} from 'costume-chip-service-protocol';

let mockCounter = 3;

let mockData: Array<DeviceCommandInfo> = [
  {
    id: 0,
    type: DeviceCommandType.InstallRuntimeCommand,
    deviceRuntimeConfig: {
      modules: {
        "costume-chip-example-module": {
          version: `link:../../packages/device/costume-chip-example-module`,
        },
      },
    },
  } as DeviceInstallRuntimeCommandInfo,
  {
    id: 1,
    type: DeviceCommandType.StartRuntimeCommand,
  } as DeviceStartRuntimeCommandInfo,
  {
    id: 2,
    type: DeviceCommandType.UpdateRuntimeModuleSettingsCommand,
    deviceRuntimeModuleName: `costume-chip-example-module`,
    deviceRuntimeModuleSettings: {
      message: `Today is ${new Date().toLocaleDateString()}`,
    },
  } as DeviceUpdateRuntimeModuleSettingsCommandInfo,
];

const app = express();

app.get(
  `/create-device-session`,
  (request, response) => {

    console.log(request.url);
    console.log(request.query);

    const deviceId = request.query[`device_id`] as string;

    console.log(deviceId);

    response.json({
      deviceSessionId: `${deviceId}-test-session`,
    });
  },
);

app.get(
  `/fetch-device-pending-commands-info`,
  (request, response) => {

    console.log(request.url);
    console.log(request.query);

    const deviceSessionId = request.query[`device_session_id`] as string;

    console.log(deviceSessionId);

    response.json(mockData);
  },
);

app.get(
  `/on-device-command-finished`,
  (request, response) => {

    console.log(request.url);
    console.log(request.query);

    const deviceSessionId = request.query[`device_session_id`] as string;
    const deviceCommandId = parseInt(request.query[`device_command_id`] as string);

    console.log(deviceSessionId);
    console.log(deviceCommandId);

    mockData = mockData.filter(
      (deviceOtherCommand) => deviceOtherCommand.id > deviceCommandId,
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
      type: DeviceCommandType.UpdateRuntimeModuleSettingsCommand,
      deviceRuntimeModuleName: `costume-chip-example-module`,
      deviceRuntimeModuleSettings: {
        message: msg,
      },
    } as DeviceUpdateRuntimeModuleSettingsCommandInfo);

    response.json({});
  },
);

app.listen(4000, () => { });
