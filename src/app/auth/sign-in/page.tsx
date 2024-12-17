"use client";

import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "@/hooks/useAuth";
import { Typography } from "@mui/material";

// preview-start
const providers = [{ id: "credentials", name: "Email and Password" }];

export default function CredentialsSignInPage() {
  const theme = useTheme();
  const { login } = useAuth();

  const handleSignIn: (
    provider: AuthProvider,
    formData: FormData,
  ) => void = async (provider, formData) => {
    await login(
      formData.get("email") as string,
      formData.get("password") as string,
    );
  };

  return (
    // preview-start
    <AppProvider theme={theme}>
      <SignInPage
        signIn={handleSignIn}
        providers={providers}
        slotProps={{
          emailField: { autoFocus: true, defaultValue: "admin@mail.com" },
          passwordField: { defaultValue: "password" },
        }}
      />
    </AppProvider>
    // preview-end
  );
}
