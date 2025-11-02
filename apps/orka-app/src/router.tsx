import AppLayout from './components/AppLayout';
import {
  SignUpPage,
  SignInPage,
  NewAppPage,
  AppUsersPage,
  AppListPage,
  ApplicationOrganizationsPage, // Import the new page
} from './pages';
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
            index: true,
            element: <AppListPage />,
          },
          {
            path: 'new',
            element: <NewAppPage />,
          },
          {
            path: ':id/users',
            element: <AppUsersPage />,
          },
          {
            path: ':id/organizations', // New route for organizations
            element: <ApplicationOrganizationsPage />,
          },
        ],
      },
    ],
  },
]);
