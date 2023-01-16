import {
  Button,
  Center,
  Heading,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { registerUserDeviceAsync } from "cosplay-pi-hub-backend-client";

import { fetchActiveUserIdTokenAsync } from "../hooks/fetch-active-user-id-token-async";

export function RegisterActiveUserDevicePageContent() {

  const navigate = useNavigate();
  const toast = useToast();

  const [searchParams] = useSearchParams();

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
      <Center
        h={`100%`}
      >
        <Heading
          as="h2"
          size="md"
          color={`red.300`}
        >
          Invalid Device Registration Data
        </Heading>
      </Center>
    );
  }

  return (
    <Center
      h={`100%`}
    >
      <Button
        colorScheme={`green`}
        disabled={isRegisteringActiveUserDevice}
        onClick={async () => {

          setIsRegisteringActiveUserDevice(true);

          try {

            await new Promise((resolve) => setTimeout(resolve, 3000));

            const activeUserIdToken = await fetchActiveUserIdTokenAsync();

            const {
              userDeviceId,
            } = await registerUserDeviceAsync({
              userIdToken: activeUserIdToken,
              userDeviceProfile: {
                name: `Device`,
                description: ``,
              },
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

            toast({
              title: `Success`,
              description: userDeviceId,
              status: `success`,
            });
            navigate(`/active-user-devices`);

          } catch (e) {

            toast({
              title: `Error`,
              description: String(e),
              status: `error`,
            });

          } finally {

            setIsRegisteringActiveUserDevice(false);
          }
        }}
      >
        {
          !isRegisteringActiveUserDevice
            ? `Register New Device`
            : <Spinner />
        }
      </Button>
    </Center>
  );
};
