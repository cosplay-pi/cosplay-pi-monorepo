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
      variant={`outline`}
      leftIcon={<FcGoogle />}
      onClick={onClick}
    >
      <Center>
        <Text>Sign in with Google</Text>
      </Center>
    </Button>
  );
}
