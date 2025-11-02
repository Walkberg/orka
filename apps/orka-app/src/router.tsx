import AppLayout from './components/AppLayout';
import {
  SignUpPage,
  SignInPage,
  NewAppPage,
  AppListPage,
  ApplicationOrganizationsPage,
} from './pages';
import { createBrowserRouter } from 'react-router-dom';
import { AppUsersPage } from './features/application-user/pages/AppUsersPage';

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
            path: ':id/organizations',
            element: <ApplicationOrganizationsPage />,
          },
        ],
      },
    ],
  },
]);
