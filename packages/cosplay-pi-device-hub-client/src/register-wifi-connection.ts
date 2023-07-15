import { execSync } from "child_process";

import { WifiConnectionConfig } from "cosplay-pi-hub-backend-protocol/dist/wifi-connection-config";

export const registerWifiConnection = async ({
  wifiConnectionConfig,
}: {
  wifiConnectionConfig: WifiConnectionConfig;
}) => {

  execSync(
    [
      `nmcli`,
      `device`,
      `wifi`,
      `connect`,
      wifiConnectionConfig.ssid,
      `password`,
      wifiConnectionConfig.password,
      `name`,
      wifiConnectionConfig.ssid,
      `ifname`,
      `wlan0`,
    ].join(` `),
  );
};
