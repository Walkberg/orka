import {
  CreateOrganization,
  OrganizationSwitcher,
  OrkaProvider,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  UserButton,
} from '@orka-react';
import './index.css';

const publishableKey = '4cc222b2-0b03-42a8-8a9e-3cc9f8a4e4f2';

function App() {
  return (
    <OrkaProvider publishableKey={publishableKey}>
      <SignedIn>
        <div>
          Bienvenue dans mon application
          <UserButton />
          <OrganizationSwitcher />
          <CreateOrganization />
        </div>
      </SignedIn>
      <SignedOut>
        <SignIn />
        <SignUp />
      </SignedOut>
    </OrkaProvider>
  );
}

export default App;
