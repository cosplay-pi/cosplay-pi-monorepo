import {
  Card,
  Link,
  Text,
} from "@nextui-org/react";
import { AiFillGithub } from "react-icons/ai";

import { Box } from "./box";

export function Footer() {

  return (
    <Box
      css={{
        marginBottom: `$md`,
        marginLeft: `$md`,
        marginRight: `$md`,
      }}
    >
      <Card>
        <Card.Body
          css={{
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `center`,
            alignItems: `center`,
            gap: `$xs`,
          }}
        >
          <Box
            css={{
              display: `flex`,
              justifyContent: `center`,
              alignItems: `center`,
            }}
          >
            <Link
              target={`_blank`}
              href={`https://github.com/cosplay-pi/cosplay-pi-monorepo`}
            >
              <AiFillGithub />
            </Link>
          </Box>
          <Text
            small
          >
            Made with ❤️ for awesome cosplay open-source community!
          </Text>
        </Card.Body>
      </Card>
    </Box>
  );
}
