import {
  Button,
  Card,
  Text,
} from "@nextui-org/react";

import { Box } from "./box";

export function HomePageContent() {

  return (
    <Box
      css={{
        width: `100%`,
        display: `flex`,
        justifyContent: `center`,
      }}
    >
      <Card
        css={{
          '@xsMax': {
            width: `$6xl`,
          },
          '@xsMin': {
            width: `$8xl`,
          },
        }}
      >
        <Card.Header
          css={{
            justifyContent: `center`,
          }}
        >
          <Text>
            Welcome to <b>Cosplay Pi Hub</b>
          </Text>
        </Card.Header>
        <Card.Body>
          <Button
            flat
            disabled
          >
            Get started
          </Button>
        </Card.Body>
      </Card>
    </Box>
  );
}
