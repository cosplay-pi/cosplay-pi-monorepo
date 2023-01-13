import {
  Center,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import * as FirebaseAuth from 'firebase/auth';
import { useEffect } from 'react';
import {
  useAuthState,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import SignInWithGoogleButton from './sign-in-with-google-button';

export function SignInPageContent() {

  const navigate = useNavigate();

  const firebaseAuth = FirebaseAuth.getAuth();

  const [firebaseUser] = useAuthState(firebaseAuth);

  const [signInWithGoogle] = useSignInWithGoogle(firebaseAuth);

  useEffect(
    () => {

      if (firebaseUser !== undefined && firebaseUser !== null) {

        navigate(`/`);
      }
    },
    [
      firebaseUser,
    ],
  );

  return (
    <Center
      minW={`100vw`}
      minH={`100vh`}
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
        <SignInWithGoogleButton onClick={() => signInWithGoogle()} />
      </Stack>
    </Center>
  );
}
