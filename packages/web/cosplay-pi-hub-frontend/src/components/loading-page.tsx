import { Loading } from '@nextui-org/react';

import { Box } from './box';

export function LoadingPage() {

  return (
    <Box
      css={{
        width: `100%`,
        height: `100vh`,
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
      }}
    >
      <Loading />
    </Box>
  );
}
