import fetch from "cross-fetch";

import { hubBackendFuncErrorTypes } from "cosplay-pi-hub-backend-protocol";
import { declareExp } from "cosplay-pi-ts-core";

import { fetchHubBackendClientConfig } from "./hub-backend-client-config";
import { HubBackendClientIsNotConfigured } from "./hub-backend-client-is-not-configured";

export const importHubBackendFunc = <TExecuteHubBackendFunc extends (hubBackendFuncExecArgs: any) => Promise<any>>(
  hubBackendFuncId: string,
): TExecuteHubBackendFunc => {

  const hubBackendFunc = async (hubBackendFuncExecArgs: any) => {

    const hubBackendClientConfig = fetchHubBackendClientConfig();

    if (hubBackendClientConfig === undefined) {

      throw new HubBackendClientIsNotConfigured();
    }

    const hubBackendFuncUrl =
      `${hubBackendClientConfig.hubBackendUrl}/api/1/${hubBackendFuncId}`;

    const requestResponse = await fetch(
      hubBackendFuncUrl,
      {
        method: `POST`,
        body: JSON.stringify(hubBackendFuncExecArgs),
        headers: {
          "Content-Type": `application/json`,
        },
      },
    );

    if (requestResponse.status === 204) {

      return undefined;

    } else if (requestResponse.status === 200) {

      return await requestResponse.json();

    } else {

      const hubBackendFuncExecErrorInfo =
        await requestResponse.json();

      const hubBackendFuncExecErrorTypeName =
        hubBackendFuncExecErrorInfo.name as string;

      const hubBackendFuncExecError = declareExp<Error>(() => {

        if (hubBackendFuncExecErrorTypeName in hubBackendFuncErrorTypes) {

          const hubBackendFuncErrorType = hubBackendFuncErrorTypes[
            hubBackendFuncExecErrorTypeName as keyof typeof hubBackendFuncErrorTypes
          ];

          return new hubBackendFuncErrorType();
        }

        return new Error();
      });

      throw hubBackendFuncExecError;
    }
  };

  return hubBackendFunc as unknown as TExecuteHubBackendFunc;
};
