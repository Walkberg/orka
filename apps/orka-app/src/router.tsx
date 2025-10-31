import AppLayout from './components/AppLayout';
import { SignUpPage, SignInPage, NewAppPage, AppUsersPage } from './pages';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'app',
        element: <AppLayout />,
        children: [
          {
            path: 'new',
            element: <NewAppPage />,
          },
          {
            path: ':id/users',
            element: <AppUsersPage />,
          },
        ],
      },
    ],
  },
]);
