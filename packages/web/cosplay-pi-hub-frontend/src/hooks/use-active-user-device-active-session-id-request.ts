import { useRequest } from "ahooks";

import { fetchDeviceActiveSessionIdAsync } from "cosplay-pi-hub-backend-client";

import { fetchActiveUserIdTokenAsync } from "./fetch-active-user-id-token-async";

export function useActiveUserDeviceActiveSessionIdRequest(
  {
    activeUserDeviceId,
  }: {
    activeUserDeviceId: string;
  }
) {

  return useRequest(async () => {

    const activeUserIdToken = await fetchActiveUserIdTokenAsync();

    const activeUserDeviceActiveSessionId = await fetchDeviceActiveSessionIdAsync({
      deviceId: activeUserDeviceId,
      userIdToken: activeUserIdToken,
    });

    return {
      activeUserDeviceActiveSessionId,
    };
  });
};
