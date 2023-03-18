import {
  Button,
  Text,
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { Box } from './box';

export function InvalidPage() {

  const navigate = useNavigate();

  return (
    <Box
      css={{
        width: `100%`,
        height: `100vh`,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `center`,
      }}
    >
      <Text
        h1
      >
        404
      </Text>
      <Button
        bordered
        onClick={() => navigate(`/`)}
      >
        Return to home page
      </Button>
    </Box>
  );
}
