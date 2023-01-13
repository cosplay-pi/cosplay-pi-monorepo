import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Stack,
  Text,
} from '@chakra-ui/react';
import * as FirebaseAuth from 'firebase/auth';
import {
  useAuthState,
  useSignInWithGoogle,
  useSignOut,
} from 'react-firebase-hooks/auth';

export function TestPage() {

  const firebaseAuth = FirebaseAuth.getAuth();

  const [firebaseUser] = useAuthState(firebaseAuth);

  const [signInWithGoogle] = useSignInWithGoogle(firebaseAuth);
  const [signOut] = useSignOut(firebaseAuth);


  return (
    <Stack
      h={`100%`}
      justify={`center`}
    >
      <Center>
        <Box>
          <Text>
            {firebaseUser?.email ?? `None`}
          </Text>
        </Box>
      </Center>
      <Center>
        <ButtonGroup>
          <Button onClick={() => signInWithGoogle()}>
            Sign in
          </Button>
          <Button onClick={() => signOut()}>
            Sign out
          </Button>
          <Button
            onClick={async () => {

              console.log(await firebaseUser?.getIdToken());
            }}
          >
            Test
          </Button>
        </ButtonGroup>
      </Center>
    </Stack>
  );
}
