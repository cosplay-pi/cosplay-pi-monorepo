import React from 'react';
import * as FirebaseAuth from 'firebase/auth';
import {
  useAuthState,
  useSignInWithGoogle,
  useSignOut,
} from 'react-firebase-hooks/auth';
import logo from './logo.svg';
import './App.css';

function App() {

  const firebaseAuth = FirebaseAuth.getAuth();

  const [firebaseUser] = useAuthState(firebaseAuth);

  const [signInWithGoogle] = useSignInWithGoogle(firebaseAuth);
  const [signOut] = useSignOut(firebaseAuth);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          {firebaseUser?.email ?? `None`}
        </p>
        <button onClick={() => signInWithGoogle()}>
          Sign in
        </button>
        <button onClick={() => signOut()}>
          Sign out
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
