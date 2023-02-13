import { useRequest } from "ahooks";

import { fetchUserDevicesInfo } from "cosplay-pi-hub-backend-client";

import { fetchActiveUserIdToken } from "./fetch-active-user-id-token";

export function useActiveUserDevicesInfoRequest() {

  return useRequest(async () => {

    const activeUserIdToken = await fetchActiveUserIdToken();

    const activeUserDevicesInfo = await fetchUserDevicesInfo({
      userIdToken: activeUserIdToken,
    });

    return {
      activeUserDevicesInfo,
    };
  });
};
