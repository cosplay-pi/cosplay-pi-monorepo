import {
  Button,
  Center,
  Text,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

export default function SignInWithGoogleButton({
  onClick,
}: {
  onClick?: () => void;
}) {

  return (
    <Button
      onClick={onClick}
      variant={`outline`}
      leftIcon={<FcGoogle />}
    >
      <Center>
        <Text>Sign in with Google</Text>
      </Center>
    </Button>
  );
}
