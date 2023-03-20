import {
  Button,
  Card,
  Code,
  Modal,
  Text,
  useModal,
} from "@nextui-org/react";
import {
  useEffect,
  useState,
} from "react";

import { pushDeviceSessionCommand } from "cosplay-pi-hub-backend-client";
import {
  DeviceCommandType,
  DeviceRuntimeModuleState,
} from 'cosplay-pi-hub-backend-protocol';

import { useActiveUserDefinedContext } from "../contexts/active-user-context";

import { Box } from "./box";

export function ActiveUserDeviceRuntimeModuleCard({
  activeUserDeviceActiveSessionId,
  activeUserDeviceRuntimeModuleName,
  activeUserDeviceRuntimeModuleState,
  doesActiveUserDeviceRuntimeProcessExist,
}: {
  activeUserDeviceId: string;
  activeUserDeviceActiveSessionId: string;
  activeUserDeviceRuntimeModuleName: string;
  activeUserDeviceRuntimeModuleState: DeviceRuntimeModuleState;
  doesActiveUserDeviceRuntimeProcessExist: boolean;
}) {

  const { fetchActiveUserIdToken } = useActiveUserDefinedContext();

  const activeUserDeviceRuntimeModuleEffectiveSettings = {
    ...activeUserDeviceRuntimeModuleState.defaultSettings,
    ...activeUserDeviceRuntimeModuleState.overrideSettings,
  };

  const activeUserDeviceRuntimeModuleOverrideSettingsAsJson =
    JSON.stringify(
      activeUserDeviceRuntimeModuleState.overrideSettings,
      undefined,
      2,
    );

  const [
    activeUserDeviceRuntimeModuleNewOverrideSettingsAsJson,
    setActiveUserDeviceRuntimeModuleNewOverrideSettingsAsJson,
  ] = useState<string>(
    activeUserDeviceRuntimeModuleOverrideSettingsAsJson,
  );

  const [
    isActiveUserDeviceRuntimeModuleNewOverrideSettingsSaved,
    setIsActiveUserDeviceRuntimeModuleNewOverrideSettingsSaved,
  ] = useState<boolean>(false);

  const isActiveUserDeviceRuntimeModuleOverrideSettingsModified =
    activeUserDeviceRuntimeModuleOverrideSettingsAsJson
    !==
    activeUserDeviceRuntimeModuleNewOverrideSettingsAsJson;

  useEffect(
    () => {

      setActiveUserDeviceRuntimeModuleNewOverrideSettingsAsJson(
        activeUserDeviceRuntimeModuleOverrideSettingsAsJson,
      );
      setIsActiveUserDeviceRuntimeModuleNewOverrideSettingsSaved(
        false,
      );
    },
    [
      activeUserDeviceRuntimeModuleOverrideSettingsAsJson,
    ],
  );

  const removeActiveUserDeviiceRuntimeModuleModalState = useModal();

  return (
    <Card>
      <Card.Header
        css={{
          display: `flex`,
          justifyContent: `center`,
          alignItems: `center`,
        }}
      >
        <b>{activeUserDeviceRuntimeModuleName}</b>
      </Card.Header>
      <Card.Body
        css={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          gap: `$lg`,
        }}
      >
        <Text small><i>Default settings:</i></Text>
        <Code
          css={{
            width: `100%`,
          }}
        >
          <i>
            {
              JSON.stringify(
                activeUserDeviceRuntimeModuleState.defaultSettings,
                null,
                2,
              )
            }
          </i>
        </Code>
        <Text small>Override settings:</Text>
        <Code
          contentEditable={!doesActiveUserDeviceRuntimeProcessExist}
          css={{
            width: `100%`,
          }}
          onInput={(e) => {

            setActiveUserDeviceRuntimeModuleNewOverrideSettingsAsJson(
              (e.currentTarget as any).textContent,
            );
          }}
        >
          {activeUserDeviceRuntimeModuleOverrideSettingsAsJson}
        </Code>
        <Text small><b>Effective settings:</b></Text>
        <Code
          css={{
            width: `100%`,
          }}
        >
          <b>
            {
              JSON.stringify(
                activeUserDeviceRuntimeModuleEffectiveSettings,
                null,
                2,
              )
            }
          </b>
        </Code>
      </Card.Body>
      <Card.Footer
        css={{
          display: `flex`,
          justifyContent: `center`,
          alignItems: `center`,
        }}
      >
        <Box
          css={{
            display: `flex`,
            flexDirection: `row`,
            justifyContent: `center`,
            gap: `$sm`,
          }}
        >

          <Button
            size={`xs`}
            color={`success`}
            disabled={
              doesActiveUserDeviceRuntimeProcessExist
              ||
              !isActiveUserDeviceRuntimeModuleOverrideSettingsModified
              ||
              isActiveUserDeviceRuntimeModuleNewOverrideSettingsSaved
            }
            onClick={async () => {

              setIsActiveUserDeviceRuntimeModuleNewOverrideSettingsSaved(true);

              try {

                const activeUserDeviceRuntimeModuleNewOverrideSettings =
                  JSON.parse(activeUserDeviceRuntimeModuleNewOverrideSettingsAsJson);

                const activeUserIdToken = await fetchActiveUserIdToken();

                await pushDeviceSessionCommand({
                  userIdToken: activeUserIdToken,
                  deviceSessionId: activeUserDeviceActiveSessionId,
                  deviceSessionCommandPayload: {
                    type: DeviceCommandType.SetRuntimeModuleOverrideSettings,
                    deviceRuntimeModuleName: activeUserDeviceRuntimeModuleName,
                    deviceRuntimeModuleOverrideSettings:
                      activeUserDeviceRuntimeModuleNewOverrideSettings,
                  },
                });

              } catch {

                setIsActiveUserDeviceRuntimeModuleNewOverrideSettingsSaved(false);
              }
            }}
          >
            Save
          </Button>
          <Button
            size={`xs`}
            color={`error`}
            disabled={doesActiveUserDeviceRuntimeProcessExist}
            onClick={() => {
              removeActiveUserDeviiceRuntimeModuleModalState.setVisible(true);
            }}
          >
            Remove
          </Button>
          <Modal
            {...removeActiveUserDeviiceRuntimeModuleModalState.bindings}
          >
            <Modal.Body>
              <Text>
                Are you sure you want to remove <b>{activeUserDeviceRuntimeModuleName}</b>?
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <Button
                auto
                color="error"
                onClick={async () => {

                  removeActiveUserDeviiceRuntimeModuleModalState.setVisible(false);

                  const activeUserIdToken = await fetchActiveUserIdToken();

                  await pushDeviceSessionCommand({
                    userIdToken: activeUserIdToken,
                    deviceSessionId: activeUserDeviceActiveSessionId,
                    deviceSessionCommandPayload: {
                      type: DeviceCommandType.RemoveRuntimeModuleCommand,
                      deviceRuntimeModuleName: activeUserDeviceRuntimeModuleName,
                    },
                  });
                }}
              >
                Remove
              </Button>
              <Button
                flat
                auto
                onClick={() => {

                  removeActiveUserDeviiceRuntimeModuleModalState.setVisible(false);
                }}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </Box>
      </Card.Footer>
    </Card>
  );
}
