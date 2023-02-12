import {
  Badge,
  Button,
  Card,
  Input,
  Loading,
  Text,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { registerUserDeviceAsync } from "cosplay-pi-hub-backend-client";
import { DeviceProfile } from "cosplay-pi-hub-backend-protocol";

import { fetchActiveUserIdTokenAsync } from "../hooks/fetch-active-user-id-token-async";

import { Box } from "./box";

export function RegisterActiveUserDevicePageContent() {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [
    activeUserDeviceName,
    setActiveUserDeviceName,
  ] = useState(``);

  const activeUserDeviceNameError =
    activeUserDeviceName.length < 6
      ? `too_short`
      : undefined;

  const activeUserDeviceNameErrorMessage =
    activeUserDeviceNameError === `too_short`
      ? `Too short`
      : undefined;

  const isActiveUserDeviceNameValid =
    activeUserDeviceNameError === undefined;

  const [
    activeUserDeviceDescription,
    setActiveUserDeviceDescription,
  ] = useState(``);

  const activeUserDeviceProfile: DeviceProfile = {
    name: activeUserDeviceName,
    description: activeUserDeviceDescription,
  };

  const isActiveUserDeviceProfileValid =
    isActiveUserDeviceNameValid;

  const activeUserDevicePrivateKeyKty = searchParams.get(`kty`);
  const activeUserDevicePrivateKeyN = searchParams.get(`n`);
  const activeUserDevicePrivateKeyE = searchParams.get(`e`);
  const activeUserDevicePrivateKeyD = searchParams.get(`d`);
  const activeUserDevicePrivateKeyP = searchParams.get(`p`);
  const activeUserDevicePrivateKeyQ = searchParams.get(`q`);
  const activeUserDevicePrivateKeyDp = searchParams.get(`dp`);
  const activeUserDevicePrivateKeyDq = searchParams.get(`dq`);
  const activeUserDevicePrivateKeyQi = searchParams.get(`qi`);

  const [
    isRegisteringActiveUserDevice,
    setIsRegisteringActiveUserDevice,
  ] = useState<boolean>(false);

  if (
    activeUserDevicePrivateKeyKty === null
    ||
    activeUserDevicePrivateKeyN === null
    ||
    activeUserDevicePrivateKeyE === null
    ||
    activeUserDevicePrivateKeyD === null
    ||
    activeUserDevicePrivateKeyP === null
    ||
    activeUserDevicePrivateKeyQ === null
    ||
    activeUserDevicePrivateKeyDp === null
    ||
    activeUserDevicePrivateKeyDq === null
    ||
    activeUserDevicePrivateKeyQi === null
  ) {

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
            <Text
              color={`error`}
            >
              Invalid register link
            </Text>
          </Card.Header>
          <Card.Body>
            <Text
              css={{
                textAlign: `center`,
              }}
            >
              Please check if you have copied (or scanned) the register link correctly.
            </Text>
          </Card.Body>
        </Card>
      </Box>
    );
  }

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
            Register a new <b>Cosplay Pi Device</b>
          </Text>
        </Card.Header>
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
              activeUserDeviceName === `` || isActiveUserDeviceNameValid
                ? `default`
                : `error`
            }
            helperText={
              activeUserDeviceName !== ``
                ? activeUserDeviceNameErrorMessage
                : undefined
            }
            value={activeUserDeviceName}
            onChange={(e) => setActiveUserDeviceName(e.target.value)}
          />
          <Textarea
            bordered
            css={{
              width: `100%`,
            }}
            label={`Description`}
            value={activeUserDeviceDescription}
            onChange={(e) => setActiveUserDeviceDescription(e.target.value)}

          />
          <Box>
            <Badge
              variant={`dot`}
              color={`success`}
            />
            <Text
              small
              css={{
                marginLeft: `$2`,
              }}
            >
              Private key successfuly imported
            </Text>
          </Box>
          <Button
            flat
            css={{
              width: `100%`,
            }}
            disabled={
              !isActiveUserDeviceProfileValid
              ||
              isRegisteringActiveUserDevice
            }
            onClick={async () => {

              setIsRegisteringActiveUserDevice(true);

              try {

                const activeUserIdToken = await fetchActiveUserIdTokenAsync();

                const {
                  userDeviceId: activeUserDeviceId,
                } = await registerUserDeviceAsync({
                  userIdToken: activeUserIdToken,
                  userDeviceProfile: activeUserDeviceProfile,
                  userDevicePrivateKeyKty: activeUserDevicePrivateKeyKty,
                  userDevicePrivateKeyN: activeUserDevicePrivateKeyN,
                  userDevicePrivateKeyE: activeUserDevicePrivateKeyE,
                  userDevicePrivateKeyD: activeUserDevicePrivateKeyD,
                  userDevicePrivateKeyP: activeUserDevicePrivateKeyP,
                  userDevicePrivateKeyQ: activeUserDevicePrivateKeyQ,
                  userDevicePrivateKeyDp: activeUserDevicePrivateKeyDp,
                  userDevicePrivateKeyDq: activeUserDevicePrivateKeyDq,
                  userDevicePrivateKeyQi: activeUserDevicePrivateKeyQi,
                });

                navigate(`/my-devices/${activeUserDeviceId}`);

              } finally {

                setIsRegisteringActiveUserDevice(false);
              }
            }}
          >
            {
              isRegisteringActiveUserDevice
                ? <Loading />
                : `Register`
            }
          </Button>
        </Card.Body>
      </Card>
    </Box>
  );
}
