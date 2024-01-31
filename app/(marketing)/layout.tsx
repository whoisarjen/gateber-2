import { NavBar } from "@/components/layout/navbar"
import { SiteFooter } from "@/components/layout/site-footer"
import { defaultConfig } from "@/config/default"
import { getCurrentUser } from "@/lib/session"
import { Suspense } from "react"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col justify-center">
      <Suspense fallback="...">
        <NavBar user={user} items={defaultConfig.mainNav} scroll={true} />
      </Suspense>
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </div>
  )
}
