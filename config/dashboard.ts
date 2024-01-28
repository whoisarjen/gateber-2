import { DashboardConfig } from "types"
import { defaultConfig } from "./default"

export const dashboardConfig: DashboardConfig = {
  mainNav: defaultConfig.mainNav,
  sidebarNav: [
    {
      title: "Wpisy",
      href: "/dashboard/posts",
      icon: "post",
    },
    // {
    //   title: "Płatności",
    //   href: "/dashboard/billing",
    //   icon: "billing",
    // },
    {
      title: "Ustawienia",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
