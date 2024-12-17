"use client";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useRouter } from "next/navigation";
import * as React from "react";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "admin",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "admin/user",
    title: "User",
    icon: <PeopleIcon />,
  },
  // {
  //   kind: "divider",
  // },
  // {
  //   kind: "header",
  //   title: "Analytics",
  // },
  // {
  //   segment: "reports",
  //   title: "Reports",
  //   icon: <BarChartIcon />,
  //   children: [
  //     {
  //       segment: "sales",
  //       title: "Sales",
  //       icon: <DescriptionIcon />,
  //     },
  //     {
  //       segment: "traffic",
  //       title: "Traffic",
  //       icon: <DescriptionIcon />,
  //     },
  //   ],
  // },
  // {
  //   segment: "integrations",
  //   title: "Integrations",
  //   icon: <LayersIcon />,
  // },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
  children: React.ReactNode;
}

export default function DashboardLayoutBasic({ window, children }: DemoProps) {
  const router = useRouter();

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        title: "EBuddy Technical Assessment - Laurentius Kevin",
        homeUrl: "/admin",
      }}
    >
      <DashboardLayout>
        <Box component="section" sx={{ p: 4 }}>
          {children}
        </Box>
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}
