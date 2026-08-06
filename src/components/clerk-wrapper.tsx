'use client';

import * as React from 'react';
import { ClerkProvider } from '@clerk/nextjs';

export const isClerkEnabled =
  typeof window !== 'undefined'
    ? (window as any).__CLERK_ENABLED__
    : process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('placeholder') &&
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.length > 30;

export function ClerkWrapper({ children }: { children: React.ReactNode }) {
  // Set global flag on client side
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__CLERK_ENABLED__ = isClerkEnabled;
    }
  }, []);

  if (!isClerkEnabled) {
    return <>{children}</>;
  }

  return <ClerkProvider>{children}</ClerkProvider>;
}
export { isClerkEnabled as defaultIsClerkEnabled };
