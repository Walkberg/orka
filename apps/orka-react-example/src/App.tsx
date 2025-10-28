import { SignedIn, SignedOut } from '@orka-react';
import './App.css';

function App() {
  return (
    <>
      <SignedIn>signed in</SignedIn>
      <SignedOut>signed out</SignedOut>
    </>
  );
}

export default App;
