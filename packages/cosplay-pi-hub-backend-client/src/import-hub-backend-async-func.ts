import fetch from "cross-fetch";

import { hubBackendAsyncFuncErrorTypes } from "cosplay-pi-hub-backend-protocol";
import { declareExp } from "cosplay-pi-ts-core";

import { fetchHubBackendClientConfig } from "./hub-backend-client-config";
import { HubBackendClientIsNotConfigured } from "./hub-backend-client-is-not-configured";

export const importHubBackendAsyncFunc = <TExecuteHubBackendAsyncFunc extends (hubBackendFuncExecArgs: any) => Promise<any>>(
  hubBackendAsyncFuncId: string,
): TExecuteHubBackendAsyncFunc => {

  const hubBackendAsyncFunc = async (hubBackendAsyncFuncExecArgs: any) => {

    const hubBackendClientConfig = fetchHubBackendClientConfig();

    if (hubBackendClientConfig === undefined) {

      throw new HubBackendClientIsNotConfigured();
    }

    const hubBackendAsyncFuncUrl =
      `${hubBackendClientConfig.hubBackendUrl}/api/1/${hubBackendAsyncFuncId}`;

    const requestResponse = await fetch(
      hubBackendAsyncFuncUrl,
      {
        method: `POST`,
        body: JSON.stringify(hubBackendAsyncFuncExecArgs),
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

      const hubBackendAsyncFuncExecErrorInfo =
        await requestResponse.json();

      const hubBackendAsyncFuncExecErrorTypeName =
        hubBackendAsyncFuncExecErrorInfo.name as string;

      const hubBackendAsyncFuncExecError = declareExp<Error>(() => {

        if (hubBackendAsyncFuncExecErrorTypeName in hubBackendAsyncFuncErrorTypes) {

          const hubBackendAsyncFuncErrorType = hubBackendAsyncFuncErrorTypes[
            hubBackendAsyncFuncExecErrorTypeName as keyof typeof hubBackendAsyncFuncErrorTypes
          ];

          return new hubBackendAsyncFuncErrorType();
        }

        return new Error();
      });

      throw hubBackendAsyncFuncExecError;
    }
  };

  return hubBackendAsyncFunc as unknown as TExecuteHubBackendAsyncFunc;
};
