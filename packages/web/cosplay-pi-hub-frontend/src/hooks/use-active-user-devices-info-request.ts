import { useRequest } from "ahooks";

import { fetchUserDevicesInfoAsync } from "cosplay-pi-hub-backend-client";

import { fetchActiveUserIdTokenAsync } from "./fetch-active-user-id-token-async";

export function useActiveUserDevicesInfoRequest() {

  return useRequest(async () => {

    const activeUserIdToken = await fetchActiveUserIdTokenAsync();

    const activeUserDevicesInfo = await fetchUserDevicesInfoAsync({
      userIdToken: activeUserIdToken,
    });

    return {
      activeUserDevicesInfo,
    };
  });
};
