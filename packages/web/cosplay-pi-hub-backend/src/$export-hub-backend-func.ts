import { hubBackendExpressApp } from "./hub-backend-express-app";

export const $exportHubBackendFunc = <$THubBackendFuncArgs, $THubBackendFuncResult>(
  $hubBackendFuncName: string,
  $executeHubBackendFuncAsync: ($hubBackendFuncArgs: $THubBackendFuncArgs) => Promise<$THubBackendFuncResult>,
) => {

  hubBackendExpressApp.get(
    `/${$hubBackendFuncName}`,
    async (expressRequest, expressResponse) => {

      const $hubBackendFuncArgs =
        expressRequest.query as unknown as $THubBackendFuncArgs;

      console.log(expressRequest.url);

      try {

        const $hubBackendFuncResult =
          await $executeHubBackendFuncAsync($hubBackendFuncArgs);

        expressResponse.status(200);

        if ($hubBackendFuncResult === undefined) {

          expressResponse.json(null);

        } else {

          expressResponse.json($hubBackendFuncResult);
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
            name: `FatalError`,
          });
        }
      }
    },
  );
};
