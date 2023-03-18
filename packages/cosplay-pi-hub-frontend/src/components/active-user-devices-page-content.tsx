import {
  Button,
  Grid,
} from "@nextui-org/react";
import { useRequest } from "ahooks";

import { fetchUserDevicesInfo } from "cosplay-pi-hub-backend-client";

import { useActiveUserDefinedContext } from "../contexts/active-user-context";

import { ActiveUserDeviceCard } from "./active-user-device-card";
import { Box } from "./box";
import { RequestInfoPageContent } from "./request-info-page-content";

export function ActiveUserDevicesPageContent() {

  const { fetchActiveUserIdToken } = useActiveUserDefinedContext();

  const request = useRequest(
    async () => {

      const activeUserIdToken = await fetchActiveUserIdToken();

      const activeUserDevicesInfo = await fetchUserDevicesInfo({
        userIdToken: activeUserIdToken,
      });

      return { activeUserDevicesInfo };
    },
    {
      refreshDeps: [
        fetchActiveUserIdToken,
      ],
    },
  );

  if (request.data === undefined) {

    return (
      <RequestInfoPageContent
        request={request}
      />
    );
  }

  const {
    activeUserDevicesInfo,
  } = request.data;

  return (
    <Box
      css={{
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `flex-start`,
        alignItems: `center`,
        gap: `$md`,
      }}
    >
      <Grid.Container gap={2} justify={`center`}>
        {
          Object.entries(activeUserDevicesInfo).map(
            ([activeUserDeviceId, activeUserDeviceInfo]) => (
              <Grid
                key={activeUserDeviceId}
                xs={3}
              >
                <ActiveUserDeviceCard
                  activeUserDeviceId={activeUserDeviceId}
                  activeUserDeviceInfo={activeUserDeviceInfo}
                />
              </Grid>
            ),
          )
        }
      </Grid.Container>
      <Button
        auto
        rounded
        disabled
      >
        Register new device
      </Button>
    </Box>
  );
};
