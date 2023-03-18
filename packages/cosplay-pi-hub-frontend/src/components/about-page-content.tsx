import {
  Card,
  Collapse,
  Link,
  Text,
} from "@nextui-org/react";

import { Box } from "./box";

export function AboutPageContent() {

  return (
    <Box
      css={{
        marginLeft: `$md`,
        marginRight: `$md`,
      }}
    >
      <Card>
        <Card.Body>
          <Collapse.Group>
            <Collapse
              title={`What is Cosplay Pi Hub?`}
            >
              <Text>
                Cosplay Pi Hub is a web application that allows you to control your Cosplay Pi Devices.
              </Text>
            </Collapse>
            <Collapse
              title={`How can I acquire a Cosplay Pi Device?`}
            >
              <Text>
                You can build it by yourself! Our current recommendation is to use Raspberry Pi Zero 2W (please note that their availability is limited as of now). The guide on how to install necessary software is still in progress.
              </Text>
            </Collapse>
            <Collapse
              title={`How can I contribute to the project?`}
            >
              <Text>
                You're more than welcomed to contribute to the project! Please check out the <Link target={`_blank`} href={`https://github.com/cosplay-pi/cosplay-pi-monorepo`}>GitHub repository</Link> for more information.
              </Text>
            </Collapse>
          </Collapse.Group>
        </Card.Body>
      </Card>
    </Box>
  );
}
