import { useRequest } from "ahooks";

import { Box } from "./box";
import { RequestInfo } from "./request-info";

export function RequestInfoPageContent({
  request,
}: {
  request: ReturnType<typeof useRequest>;
}) {

  return (
    <Box
      css={{
        width: `100%`,
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
      }}
    >
      <RequestInfo request={request} />
    </Box>
  );
}
