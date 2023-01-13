import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function TopBarSignInButton() {

  const navigate = useNavigate();

  return (
    <Button
      fontSize={`sm`}
      fontWeight={600}
      color={`white`}
      bg={`pink.400`}
      _hover={{
        bg: `pink.300`,
      }}
      onClick={() => { navigate(`/sign-in`); }}
    >
      Sign In
    </Button>
  );
}
