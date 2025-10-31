import { OrkaProvider, SignedIn, SignedOut, SignIn, SignUp } from '@orka-react';
import './index.css';

function App() {
  return (
    <OrkaProvider publishableKey="test">
      <SignedIn>signed in</SignedIn>
      <SignedOut>signed out</SignedOut>
      <SignIn />
      <SignUp />
    </OrkaProvider>
  );
}

export default App;
