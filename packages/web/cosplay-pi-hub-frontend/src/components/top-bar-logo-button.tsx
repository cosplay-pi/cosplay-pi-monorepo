import {
  Icon,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { CgSmartphoneChip } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export function TopBarLogoButton() {

  const navigate = useNavigate();

  return (
    <IconButton
      icon={(
        <Icon
          as={CgSmartphoneChip}
          boxSize={6}
          color={useColorModeValue(`gray.800`, `white`)}
        />
      )}
      size={`xs`}
      aria-label={`Cosplay Pi Hub`}
      variant={`unstyled`}
      onClick={() => { navigate(`/`); }}
    />
  );
}
