import {
  Button,
  Card,
  Input,
  Loading,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";

import { setUserDeviceProfile } from "cosplay-pi-hub-backend-client";
import { DeviceProfile } from "cosplay-pi-hub-backend-protocol";

import { useActiveUserDefinedContext } from "../contexts/active-user-context";

export function EditActiveUserDeviceProfileCard({
  activeUserDeviceId,
  activeUserDeviceProfile,
}: {
  activeUserDeviceId: string;
  activeUserDeviceProfile: DeviceProfile;
}) {

  const { fetchActiveUserIdToken } = useActiveUserDefinedContext();

  const [
    activeUserDeviceNewName,
    setActiveUserDeviceNewName,
  ] = useState(activeUserDeviceProfile.name);

  const activeUserDeviceNewNameError =
    activeUserDeviceNewName.length < 6
      ? `too_short`
      : undefined;

  const activeUserDeviceNewNameErrorMessage =
    activeUserDeviceNewNameError === `too_short`
      ? `Too short`
      : undefined;

  const isActiveUserDeviceNewNameValid =
    activeUserDeviceNewNameError === undefined;

  const [
    activeUserDeviceNewDescription,
    setActiveUserDeviceNewDescription,
  ] = useState(activeUserDeviceProfile.description);

  const activeUserDeviceNewProfile: DeviceProfile = {
    name: activeUserDeviceNewName,
    description: activeUserDeviceNewDescription,
  };

  const isActiveUserDeviceNewProfileValid =
    isActiveUserDeviceNewNameValid;

  const isActiveUserDeviceProfileModified =
    activeUserDeviceNewName !== activeUserDeviceProfile.name
    ||
    activeUserDeviceNewDescription !== activeUserDeviceProfile.description;

  const [
    isSettingActiveUserDeviceProfile,
    setIsSettingActiveUserDeviceProfile,
  ] = useState<boolean>(false);

  return (
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
      <Card.Body
        css={{
          width: `100%`,
          display: `flex`,
          flexDirection: `column`,
          justifyContent: `flex-start`,
          alignItems: `center`,
          gap: `$xl`,
        }}
      >
        <Input
          bordered
          css={{
            width: `100%`,
          }}
          label={`Name`}
          status={
            activeUserDeviceNewName === `` || isActiveUserDeviceNewNameValid
              ? `default`
              : `error`
          }
          helperText={
            activeUserDeviceNewName !== ``
              ? activeUserDeviceNewNameErrorMessage
              : undefined
          }
          value={activeUserDeviceNewName}
          onChange={(e) => setActiveUserDeviceNewName(e.target.value)}
        />
        <Textarea
          bordered
          css={{
            width: `100%`,
          }}
          label={`Description`}
          value={activeUserDeviceNewDescription}
          onChange={(e) => setActiveUserDeviceNewDescription(e.target.value)}
        />
        <Button
          flat
          color={`success`}
          css={{
            width: `100%`,
          }}
          disabled={
            !isActiveUserDeviceProfileModified
            ||
            !isActiveUserDeviceNewProfileValid
            ||
            isSettingActiveUserDeviceProfile
          }
          onClick={async () => {

            setIsSettingActiveUserDeviceProfile(true);

            try {

              const activeUserIdToken = await fetchActiveUserIdToken();

              await setUserDeviceProfile({
                userIdToken: activeUserIdToken,
                userDeviceId: activeUserDeviceId,
                userDeviceProfile: activeUserDeviceNewProfile,
              });

            } finally {

              setIsSettingActiveUserDeviceProfile(false);
            }
          }}
        >
          {
            isSettingActiveUserDeviceProfile
              ? <Loading />
              : `Save`
          }
        </Button>
      </Card.Body>
    </Card>
  );
}
