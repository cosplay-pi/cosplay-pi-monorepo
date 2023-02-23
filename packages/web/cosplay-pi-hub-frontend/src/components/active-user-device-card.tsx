import {
  Badge,
  Card,
  Link,
  Loading,
  Text,
} from "@nextui-org/react";
import { useRequest } from "ahooks";
import { useNavigate } from "react-router-dom";

import { fetchDeviceActiveSessionId } from "cosplay-pi-hub-backend-client";
import { DeviceInfo } from 'cosplay-pi-hub-backend-protocol';

import { useActiveUserDefinedContext } from "../contexts/active-user-context";

import { RequestInfo } from "./request-info";

export function ActiveUserDeviceCard({
  activeUserDeviceId,
  activeUserDeviceInfo,
}: {
  activeUserDeviceId: string;
  activeUserDeviceInfo: DeviceInfo;
}) {

  const navigate = useNavigate();

  const { fetchActiveUserIdToken } = useActiveUserDefinedContext();

  const request = useRequest(
    async () => {

      const activeUserIdToken = await fetchActiveUserIdToken();

      const activeUserDeviceActiveSessionId = await fetchDeviceActiveSessionId({
        userIdToken: activeUserIdToken,
        deviceId: activeUserDeviceId,
      });

      return { activeUserDeviceActiveSessionId };
    },
    {
      refreshDeps: [
        fetchActiveUserIdToken,
        activeUserDeviceId,
      ],
    },
  );

  if (request.data === undefined) {

    return (
      <RequestInfo
        request={request}
      />
    );
  }

  const {
    activeUserDeviceActiveSessionId,
  } = request.data;

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
          request.loading
            ? (
              <Loading
                size={`xs`}
              />
            )
            : activeUserDeviceActiveSessionId !== undefined
              ? <Badge variant={`dot`} color={`success`} />
              : undefined
        }
        <Link
          css={{
            marginLeft: `$2`,
          }}
          onClick={() => navigate(`/my-devices/${activeUserDeviceId}/sessions/${activeUserDeviceActiveSessionId}`)}
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
