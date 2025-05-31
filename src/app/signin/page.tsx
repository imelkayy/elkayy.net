"use client";

import { SignInPage as TPSignin } from "@toolpad/core";
import { AppProvider } from '@toolpad/core/AppProvider';
import { providers } from "@/auth";
import { useTheme } from "@mui/material";
import { dispatchSignin } from "@/lib/actions/auth";

export default function SignInPage() {
  const theme = useTheme();

  return (
    <AppProvider>
      <TPSignin
        providers={providers}
        signIn={async (provider) => await dispatchSignin(provider.id, "/")}
      />
    </AppProvider>
  )
}