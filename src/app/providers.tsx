"use client";

import { SnackbarProvider } from "@/contexts/snackbarContext";
import { store } from "@/store/store";
import theme from "@/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <SnackbarProvider>{children}</SnackbarProvider>
        </Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
