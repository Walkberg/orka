import { useAuth } from "@/providers/OrkaProvider";
import type { ReactNode } from "react";

export const SignedIn = ({ children }: { children: ReactNode }) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return null;
  }

  return <>{children}</>;
};
