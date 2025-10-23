import { SignedIn } from "orka-react/components/SignedIn";
import { SignedOut } from "orka-react/components/SignedOut";
import "./App.css";

function App() {
  return (
    <>
      <SignedIn>signed in</SignedIn>
      <SignedOut>signed out</SignedOut>
    </>
  );
}

export default App;
