import {
  Button,
  Grid,
} from "@nextui-org/react";

import { useActiveUserDevicesInfoRequest } from "../hooks/use-active-user-devices-info-request";

import { ActiveUserDeviceCard } from "./active-user-device-card";
import { Box } from "./box";
import { RequestInfoPageContent } from "./request-info-page-content";

export function ActiveUserDevicesPageContent() {

  const activeUserDevicesInfoRequest = useActiveUserDevicesInfoRequest();

  if (activeUserDevicesInfoRequest.data === undefined) {

    return (
      <RequestInfoPageContent
        request={activeUserDevicesInfoRequest}
      />
    );
  }

  const {
    activeUserDevicesInfo,
  } = activeUserDevicesInfoRequest.data;

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
            )
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
