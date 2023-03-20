import {
  Button,
  Card,
  Input,
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
  DeviceRuntimeState,
} from 'cosplay-pi-hub-backend-protocol';

import { useActiveUserDefinedContext } from "../contexts/active-user-context";

export function AddActiveUserDeviceRuntimeNewModuleCard({
  activeUserDeviceActiveSessionId,
  activeUserDeviceRuntimeLastState,
  doesActiveUserDeviceRuntimeProcessExist,
}: {
  activeUserDeviceActiveSessionId: string;
  activeUserDeviceRuntimeLastState: DeviceRuntimeState;
  doesActiveUserDeviceRuntimeProcessExist: boolean;
}) {

  const { fetchActiveUserIdToken } = useActiveUserDefinedContext();

  const [
    activeUserDeviceRuntimeNewModuleName,
    setActiveUserDeviceRuntimeNewModuleName,
  ] = useState<string>(``);

  const isActiveUserDeviceRuntimeNewModuleName = true;

  const activeUserDeviceRuntimeNewModuleNameErrorMessage = ``;

  const [
    isActiveUserDeviceRuntimeNewModuleAdded,
    setIsActiveUserDeviceRuntimeNewModuleAdded,
  ] = useState<boolean>(false);

  const addActiveUserDeviiceRuntimeNewModuleModalState = useModal();

  useEffect(
    () => {

      setActiveUserDeviceRuntimeNewModuleName(``);
      setIsActiveUserDeviceRuntimeNewModuleAdded(false);
    },
    [
      JSON.stringify(activeUserDeviceRuntimeLastState),
    ],
  );

  return (
    <Card
      css={{
        width: `$6xl`,
      }}
    >
      <Card.Body
        css={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          gap: `$lg`,
        }}
      >
        <Input
          bordered
          css={{
            width: `100%`,
          }}
          disabled={
            doesActiveUserDeviceRuntimeProcessExist
            ||
            isActiveUserDeviceRuntimeNewModuleAdded
          }
          label={`Name`}
          status={
            activeUserDeviceRuntimeNewModuleName === `` || isActiveUserDeviceRuntimeNewModuleName
              ? `default`
              : `error`
          }
          helperText={
            activeUserDeviceRuntimeNewModuleName !== ``
              ? activeUserDeviceRuntimeNewModuleNameErrorMessage
              : undefined
          }
          value={activeUserDeviceRuntimeNewModuleName}
          onChange={(e) => setActiveUserDeviceRuntimeNewModuleName(e.target.value)}
        />
      </Card.Body>
      <Card.Footer
        css={{
          display: `flex`,
          justifyContent: `center`,
          alignItems: `center`,
        }}
      >
        <Button
          flat
          color={`success`}
          css={{
            width: `100%`,
          }}
          disabled={
            doesActiveUserDeviceRuntimeProcessExist
            ||
            activeUserDeviceRuntimeNewModuleName === ``
            ||
            isActiveUserDeviceRuntimeNewModuleAdded
          }
          onClick={() => {

            addActiveUserDeviiceRuntimeNewModuleModalState.setVisible(true);
          }}
        >
          Add module
        </Button>
        <Modal
          {...addActiveUserDeviiceRuntimeNewModuleModalState.bindings}
        >
          <Modal.Body>
            <Text>
              Are you sure you want to add <b>{activeUserDeviceRuntimeNewModuleName}</b>?
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              auto
              color="success"
              onClick={async () => {

                addActiveUserDeviiceRuntimeNewModuleModalState.setVisible(false);

                setIsActiveUserDeviceRuntimeNewModuleAdded(true);

                try {

                  const activeUserIdToken = await fetchActiveUserIdToken();

                  await pushDeviceSessionCommand({
                    userIdToken: activeUserIdToken,
                    deviceSessionId: activeUserDeviceActiveSessionId,
                    deviceSessionCommandPayload: {
                      type: DeviceCommandType.AddRuntimeModuleCommand,
                      deviceRuntimeModuleName: activeUserDeviceRuntimeNewModuleName,
                    },
                  });

                } catch {

                  setIsActiveUserDeviceRuntimeNewModuleAdded(false);
                }
              }}
            >
              Add
            </Button>
            <Button
              flat
              auto
              onClick={() => {

                addActiveUserDeviiceRuntimeNewModuleModalState.setVisible(false);
              }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Footer>
    </Card>
  );
}
