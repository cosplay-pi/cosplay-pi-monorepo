import {
  Button,
  Card,
  Grid,
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

import { ActiveUserDeviceRuntimeModuleCard } from "./active-user-device-runtime-module-card";
import { AddActiveUserDeviceRuntimeNewModuleCard } from "./add-active-user-device-runtime-new-module-card";
import { Box } from "./box";
import { EditActiveUserDeviceProfileCard } from "./edit-active-user-device-profile-card";
import { RequestInfoPageContent } from "./request-info-page-content";

export function ActiveUserDevicePageContent() {

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

      const activeUserDeviceRuntimeLastState = await fetchDeviceRuntimeLastState({
        userIdToken: activeUserIdToken,
        deviceId: activeUserDeviceId,
      });

      return {
        activeUserDeviceActiveSessionId,
        activeUserDeviceInfo,
        activeUserDeviceRuntimeLastState,
      };
    },
    {
      refreshDeps: [
        fetchActiveUserIdToken,
        activeUserDeviceId,
      ],
      pollingInterval: 5000,
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
    activeUserDeviceRuntimeLastState,
  } = request.data;

  const doesActiveUserDeviceRuntimeProcessExist =
    activeUserDeviceRuntimeLastState.process !== undefined;

  return (
    <Box
      css={{
        width: `100%`,
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        gap: `$md`,
      }}
    >
      <EditActiveUserDeviceProfileCard
        activeUserDeviceId={activeUserDeviceId}
        activeUserDeviceProfile={activeUserDeviceInfo.profile}
      />
      {
        activeUserDeviceActiveSessionId === undefined
          ? undefined
          : (
            <>
              <Grid.Container gap={2} justify={`center`}>
                {
                  Object.entries(activeUserDeviceRuntimeLastState.modules).map(
                    ([activeUserDeviceRuntimeModuleName, activeUserDeviceRuntimeModuleState]) => (
                      <Grid
                        key={activeUserDeviceRuntimeModuleName}
                        xs={4}
                        css={{
                          display: `flex`,
                          flexDirection: `column`,
                          alignItems: `center`,
                        }}
                      >
                        <ActiveUserDeviceRuntimeModuleCard
                          activeUserDeviceId={activeUserDeviceId}
                          activeUserDeviceActiveSessionId={activeUserDeviceActiveSessionId}
                          activeUserDeviceRuntimeModuleName={activeUserDeviceRuntimeModuleName}
                          activeUserDeviceRuntimeModuleState={activeUserDeviceRuntimeModuleState}
                          doesActiveUserDeviceRuntimeProcessExist={doesActiveUserDeviceRuntimeProcessExist}
                        />
                      </Grid>
                    ),
                  )
                }
              </Grid.Container>
              <AddActiveUserDeviceRuntimeNewModuleCard
                activeUserDeviceActiveSessionId={activeUserDeviceActiveSessionId}
                activeUserDeviceRuntimeLastState={activeUserDeviceRuntimeLastState}
                doesActiveUserDeviceRuntimeProcessExist={doesActiveUserDeviceRuntimeProcessExist}
              />
            </>
          )
      }
      <Card
        css={{
          width: `$6xl`,
        }}
      >
        <Card.Body
          css={{
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `center`,
            alignItems: `center`,
            gap: `$md`,
          }}
        >
          {
            activeUserDeviceActiveSessionId === undefined
              ? <Text small>Device is <b>offline</b></Text>
              : (
                <>
                  {
                    !doesActiveUserDeviceRuntimeProcessExist
                      ? (
                        <Button
                          auto
                          color={`success`}
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
                          Start runtime
                        </Button>
                      )
                      : (
                        <>
                          <Button
                            auto
                            color={`error`}
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
                            Stop runtime
                          </Button>
                          <Text small color={`warning`}>Stop the runtime to enable modules editing.</Text>
                        </>
                      )
                  }
                </>
              )
          }
        </Card.Body>
      </Card>
    </Box>
  );
}
