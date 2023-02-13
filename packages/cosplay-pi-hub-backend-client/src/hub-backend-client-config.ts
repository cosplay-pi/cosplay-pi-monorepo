import { declareGlobal } from "cosplay-pi-ts-core";

export interface HubBackendClientConfig {
  hubBackendUrl: string;
};

export const [
  fetchHubBackendClientConfig,
  setHubBackendClientConfig,
] = declareGlobal<HubBackendClientConfig | undefined>(undefined);
