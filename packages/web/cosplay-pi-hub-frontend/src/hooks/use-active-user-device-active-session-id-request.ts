import { useRequest } from "ahooks";

import { fetchDeviceActiveSessionId } from "cosplay-pi-hub-backend-client";

import { fetchActiveUserIdToken } from "./fetch-active-user-id-token";

export function useActiveUserDeviceActiveSessionIdRequest(
  {
    activeUserDeviceId,
  }: {
    activeUserDeviceId: string;
  }
) {

  return useRequest(async () => {

    const activeUserIdToken = await fetchActiveUserIdToken();

    const activeUserDeviceActiveSessionId = await fetchDeviceActiveSessionId({
      deviceId: activeUserDeviceId,
      userIdToken: activeUserIdToken,
    });

    return {
      activeUserDeviceActiveSessionId,
    };
  });
};
