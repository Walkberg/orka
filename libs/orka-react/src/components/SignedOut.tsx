import { useAuth } from '../providers/OrkaAuthProvider';
import type { ReactNode } from 'react';

export const SignedOut = ({ children }: { children: ReactNode }) => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return null;
  }

  return <>{children}</>;
};
