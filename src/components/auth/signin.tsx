"use client";

import { AuthProvider, SignInPage as TPSignin } from "@toolpad/core";
import { AppProvider } from '@toolpad/core/AppProvider';
import { dispatchSignin } from "@/lib/actions/auth";

export default function Signin({
  providers
} : {
  providers: AuthProvider[]
}) {
    
  return (
    <AppProvider>
      <TPSignin
        providers={providers}
        signIn={async (provider) => await dispatchSignin(provider.id, "/")}
      />
    </AppProvider>
  )
}