import { useContext } from "react";
import { AlertColor } from "@mui/material";
import { SnackbarContext } from "@/contexts/snackbarContext";

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }

  return context;
};
