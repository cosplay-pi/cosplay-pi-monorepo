import {
  Button,
  Card,
  Text,
} from "@nextui-org/react";
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";

import {
  fetchDeviceActiveSessionId,
  fetchDeviceInfo,
  fetchDeviceRuntimeLastState,
  pushDeviceSessionCommand,
} from "cosplay-pi-hub-backend-client";
import { DeviceCommandType } from "cosplay-pi-hub-backend-protocol";

import { useActiveUserDefinedContext } from "../contexts/active-user-context";

import { Box } from "./box";
import { RequestInfoPageContent } from "./request-info-page-content";

export function ActiveUserDeviceActiveSessionPageContent() {

  const {
    activeUserDeviceId,
  } = useParams() as {
    activeUserDeviceId: string;
  };

  const { fetchActiveUserIdToken } = useActiveUserDefinedContext();

  const request = useRequest(
    async () => {

      const activeUserIdToken = await fetchActiveUserIdToken();

      const activeUserDeviceActiveSessionId = await fetchDeviceActiveSessionId({
        userIdToken: activeUserIdToken,
        deviceId: activeUserDeviceId,
      });

      const activeUserDeviceInfo = await fetchDeviceInfo({
        userIdToken: activeUserIdToken,
        deviceId: activeUserDeviceId,
      });

      const activeUserDeviceLastState = await fetchDeviceRuntimeLastState({
        userIdToken: activeUserIdToken,
        deviceId: activeUserDeviceId,
      });

      return {
        activeUserDeviceActiveSessionId,
        activeUserDeviceInfo,
        activeUserDeviceLastState,
      };
    },
    {
      refreshDeps: [
        fetchActiveUserIdToken,
        activeUserDeviceId,
      ],
    },
  );

  if (
    request.data === undefined
  ) {

    return (
      <RequestInfoPageContent
        request={request}
      />
    );
  }

  const {
    activeUserDeviceActiveSessionId,
    activeUserDeviceInfo,
    activeUserDeviceLastState,
  } = request.data;

  return (
    <Box
      css={{
        width: `100%`,
        display: `flex`,
        justifyContent: `center`,
      }}
    >
      <Card
        css={{
          '@xsMax': {
            width: `$6xl`,
          },
          '@xsMin': {
            width: `$8xl`,
          },
        }}
      >
        <Card.Header
          css={{
            justifyContent: `center`,
          }}
        >
          <Text>
            {activeUserDeviceInfo.profile.name}
          </Text>
        </Card.Header>
        <Card.Body>
          <Text>
            Active session ID: {activeUserDeviceActiveSessionId}
          </Text>
          <Text
            css={{
              whiteSpace: `pre-wrap`,
            }}
          >
            {JSON.stringify(activeUserDeviceLastState, undefined, 2)}
          </Text>
          <Button
            flat
            onClick={() => request.refresh()}
          >
            Reload
          </Button>
          {
            activeUserDeviceActiveSessionId === undefined
              ? undefined
              : (
                <>
                  <Button
                    flat
                    onClick={async () => {

                      const activeUserIdToken = await fetchActiveUserIdToken();

                      pushDeviceSessionCommand({
                        userIdToken: activeUserIdToken,
                        deviceSessionId: activeUserDeviceActiveSessionId,
                        deviceSessionCommandPayload: {
                          type: DeviceCommandType.AddRuntimeModuleCommand,
                          deviceRuntimeModuleName: `cosplay-pi-device-runtime-example-module`,
                        },
                      });
                    }}
                  >
                    Add example-module
                  </Button>
                  <Button
                    flat
                    onClick={async () => {

                      const activeUserIdToken = await fetchActiveUserIdToken();

                      pushDeviceSessionCommand({
                        userIdToken: activeUserIdToken,
                        deviceSessionId: activeUserDeviceActiveSessionId,
                        deviceSessionCommandPayload: {
                          type: DeviceCommandType.RemoveRuntimeModuleCommand,
                          deviceRuntimeModuleName: `cosplay-pi-device-runtime-example-module`,
                        },
                      });
                    }}
                  >
                    Remove example-module
                  </Button>
                  <Button
                    flat
                    onClick={async () => {

                      const activeUserIdToken = await fetchActiveUserIdToken();

                      pushDeviceSessionCommand({
                        userIdToken: activeUserIdToken,
                        deviceSessionId: activeUserDeviceActiveSessionId,
                        deviceSessionCommandPayload: {
                          type: DeviceCommandType.StartRuntimeCommand,
                        },
                      });
                    }}
                  >
                    Start Runtime
                  </Button>
                  <Button
                    flat
                    onClick={async () => {

                      const activeUserIdToken = await fetchActiveUserIdToken();

                      pushDeviceSessionCommand({
                        userIdToken: activeUserIdToken,
                        deviceSessionId: activeUserDeviceActiveSessionId,
                        deviceSessionCommandPayload: {
                          type: DeviceCommandType.SetRuntimeModuleOverrideSettings,
                          deviceRuntimeModuleName: `cosplay-pi-device-runtime-example-module`,
                          deviceRuntimeModuleOverrideSettings: {
                            message: new Date().toISOString(),
                          },
                        },
                      });
                    }}
                  >
                    Change settings
                  </Button>
                  <Button
                    flat
                    onClick={async () => {

                      const activeUserIdToken = await fetchActiveUserIdToken();

                      pushDeviceSessionCommand({
                        userIdToken: activeUserIdToken,
                        deviceSessionId: activeUserDeviceActiveSessionId,
                        deviceSessionCommandPayload: {
                          type: DeviceCommandType.StopRuntimeCommand,
                        },
                      });
                    }}
                  >
                    Stop Runtime
                  </Button>
                </>
              )
          }
        </Card.Body>
      </Card>
    </Box>
  );
}
