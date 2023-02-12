import {
  Button,
  Loading,
} from '@nextui-org/react';
import { useRequest } from 'ahooks';

export function RequestInfo({
  request,
}: {
  request: ReturnType<typeof useRequest>;
}) {

  if (request.loading) {

    return <Loading />;
  };

  if (request.data === undefined) {

    return (
      <Button
        onClick={request.run}
      >
        Reload
      </Button>
    );
  };

  return null;
}
