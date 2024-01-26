import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Dokumentacja",
      href: "/docs",
    },
    {
      title: "Kontakt",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Panel",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Płatności",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Ustawienia",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
