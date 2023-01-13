import {
  Center,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

import { useNavigateToHomePageIfActiveUserExistsEffect } from './hooks/use-navigate-to-home-page-if-active-user-exists-effect';
import { useSignInActiveUserWithGoogle } from './hooks/use-sign-in-active-user-with-google';
import SignInWithGoogleButton from './sign-in-with-google-button';

export function SignInPageContent() {

  const { signInActiveUserWithGoogle } = useSignInActiveUserWithGoogle();

  useNavigateToHomePageIfActiveUserExistsEffect();

  return (
    <Center
      h={`100%`}
    >
      <Stack
        minW={{
          base: `xs`,
          md: `xl`,
        }}
        rounded={`lg`}
        bg={useColorModeValue(`white`, `gray.700`)}
        boxShadow={`lg`}
        p={8}
        spacing={4}
      >
        <SignInWithGoogleButton onClick={() => signInActiveUserWithGoogle()} />
      </Stack>
    </Center>
  );
}
