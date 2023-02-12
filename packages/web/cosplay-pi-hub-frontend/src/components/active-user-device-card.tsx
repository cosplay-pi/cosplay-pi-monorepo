import {
  Badge,
  Card,
  Link,
  Loading,
  Text,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import { DeviceInfo } from 'cosplay-pi-hub-backend-protocol';

import { useActiveUserDeviceActiveSessionIdRequest } from "../hooks/use-active-user-device-active-session-id-request";

export function ActiveUserDeviceCard({
  activeUserDeviceId,
  activeUserDeviceInfo,
}: {
  activeUserDeviceId: string;
  activeUserDeviceInfo: DeviceInfo;
}) {

  const navigate = useNavigate();

  const activeUserDeviceActiveSessionIdRequest =
    useActiveUserDeviceActiveSessionIdRequest({
      activeUserDeviceId: activeUserDeviceId,
    });

  return (
    <Card>
      <Card.Header
        css={{
          display: `flex`,
          justifyContent: `center`,
          alignItems: `center`,
        }}
      >
        {
          activeUserDeviceActiveSessionIdRequest.loading
            ? (
              <Loading
                size={`xs`}
              />
            )
            : activeUserDeviceActiveSessionIdRequest.data?.activeUserDeviceActiveSessionId !== undefined
              ? <Badge variant={`dot`} color={`success`} />
              : undefined
        }
        <Link
          css={{
            marginLeft: `$2`,
          }}
          onClick={() => navigate(`/`)}
        >
          <b>{activeUserDeviceInfo.profile.name}</b>
        </Link>
      </Card.Header>
      <Card.Body
        css={{
          display: `flex`,
          flexDirection: `column`,
          justifyContent: `flex-start`,
        }}
      >
        <Text
          css={{
            whiteSpace: `pre-line`,
          }}
        >
          {
            activeUserDeviceInfo.profile.description !== ``
              ? activeUserDeviceInfo.profile.description
              : <em>No description</em>
          }
        </Text>
      </Card.Body>
      <Card.Footer>
        <Text small>
          Last active on 21/07/2021 at 12:00
        </Text>
      </Card.Footer>
    </Card>
  );
}
