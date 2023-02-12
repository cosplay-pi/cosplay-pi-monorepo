import {
  Button,
  Link,
  Navbar,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export function HeaderNoActiveUserMenu() {

  const navigate = useNavigate();

  return (
    <Navbar.Item>
      <Button
        auto
        flat
        rounded
        as={Link}
        onClick={() => navigate(`/sign-in`)}
      >
        Sign In
      </Button>
    </Navbar.Item>
  );
}
