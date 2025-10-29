import { OrkaProvider, SignedIn, SignedOut, SignIn } from '@orka-react';
import './App.css';

function App() {
  return (
    <OrkaProvider>
      <SignedIn>signed in</SignedIn>
      <SignedOut>signed out</SignedOut>
      <SignIn />
    </OrkaProvider>
  );
}

export default App;
