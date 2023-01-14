import { hubBackendExpressApp } from "./hub-backend-express-app";

export const $exportHubBackendAsyncFunc = <$TExecuteHubBackendAsyncFunc extends ($hubBackendFuncExecArgs: any) => Promise<any>>(
  $hubBackendAsyncFuncId: string,
  $executeHubBackendAsyncFunc: $TExecuteHubBackendAsyncFunc,
) => {

  hubBackendExpressApp.post(
    `/${$hubBackendAsyncFuncId}`,
    async (expressRequest, expressResponse) => {

      console.log(expressRequest.url);

      const $hubBackendAsyncFuncExecArgs =
        expressRequest.body as unknown;

      try {

        const $hubBackendAsyncFuncExecResult =
          await $executeHubBackendAsyncFunc($hubBackendAsyncFuncExecArgs);

        if ($hubBackendAsyncFuncExecResult === undefined) {

          expressResponse.status(204);
          expressResponse.json(null);

        } else {

          expressResponse.status(200);
          expressResponse.json($hubBackendAsyncFuncExecResult);
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
