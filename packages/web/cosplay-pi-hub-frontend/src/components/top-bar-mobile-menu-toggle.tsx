import {
  Icon,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  CgClose,
  CgMenu,
} from "react-icons/cg";

export function TopBarMobileMenuToggle({
  mobileMenuDisclosure,
}: {
  mobileMenuDisclosure: ReturnType<typeof useDisclosure>;
}) {

  return (
    <IconButton
      ml={-2}
      icon={
        mobileMenuDisclosure.isOpen
          ? <Icon as={CgClose} boxSize={3} />
          : <Icon as={CgMenu} boxSize={5} />
      }
      variant={`ghost`}
      aria-label={`Toggle Menu`}
      onClick={mobileMenuDisclosure.onToggle}
    />
  );
}
