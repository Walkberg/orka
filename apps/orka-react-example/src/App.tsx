import { OrkaProvider, SignedIn, SignedOut } from '@orka-react';
import './App.css';

function App() {
  return (
    <OrkaProvider>
      <SignedIn>signed in</SignedIn>
      <SignedOut>signed out</SignedOut>
    </OrkaProvider>
  );
}

export default App;
