import { hubBackendExpressApp } from "./hub-backend-express-app";

export const exportHubBackendFunc = <TExecuteHubBackendFunc extends (hubBackendFuncExecArgs: any) => Promise<any>>(
  hubBackendFuncId: string,
  executeHubBackendFunc: TExecuteHubBackendFunc,
) => {

  hubBackendExpressApp.post(
    `/api/1/${hubBackendFuncId}`,
    async (expressRequest, expressResponse) => {

      console.log(expressRequest.url);

      const hubBackendFuncExecArgs =
        expressRequest.body as unknown;

      try {

        const hubBackendFuncExecResult =
          await executeHubBackendFunc(hubBackendFuncExecArgs);

        if (hubBackendFuncExecResult === undefined) {

          expressResponse.status(204);
          expressResponse.json(null);

        } else {

          expressResponse.status(200);
          expressResponse.json(hubBackendFuncExecResult);
        }

      } catch (e) {

        console.log(e);

        expressResponse.status(400);

        if (e instanceof Error) {

          expressResponse.json({
            name: e.name,
          });

        } else {

          expressResponse.json({
            name: `Error`,
          });
        }
      }
    },
  );
};
