"use client";

import { useAppSelector } from "@/store/hooks";
import { store } from "@/store/store";
import { Box, Typography } from "@mui/material";

export default function AdminPage() {
  const auth = useAppSelector((state) => state.auth);
  console.log(auth);

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography>Dashboard content</Typography>
    </Box>
  );
}
