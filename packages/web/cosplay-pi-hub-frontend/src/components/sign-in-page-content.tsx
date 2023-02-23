import {
  Button,
  Card,
  Text,
} from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";

import { useActiveUserDefinedContext } from "../contexts/active-user-context";

import { Box } from "./box";

export function SignInPageContent() {

  const { signInActiveUserWithGoogle } = useActiveUserDefinedContext();

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
            Sign in to <b>Cosplay Pi Hub</b>
          </Text>
        </Card.Header>
        <Card.Body>
          <Button
            flat
            icon={<FcGoogle />}
            onClick={signInActiveUserWithGoogle}
          >
            Sign in with Google
          </Button>
        </Card.Body>
      </Card>
    </Box>
  );
}
