import './index.css';
import { OrkaProvider } from '@orka-react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const publishableKey = '4cc222b2-0b03-42a8-8a9e-3cc9f8a4e4f2';

function App() {
  return (
    <OrkaProvider publishableKey={publishableKey}>
      <RouterProvider router={router} />
    </OrkaProvider>
  );
}

export default App;
