import { redirect } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import Link from "next/link"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Panel" text="Twórz i zarządzaj swoimi postami.">
        <Link
          href="/dashboard/posts/create"
          className={cn(
            buttonVariants({})
          )}
        >
          Stwórz wpis
        </Link>
      </DashboardHeader>
      <div>
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>Brak wpisów</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Jeszcze nie masz żadnego wpisu. Zacznij je tworzyć.
          </EmptyPlaceholder.Description>
          <Link
            href="/dashboard/posts/create"
            className={cn(
              buttonVariants({ variant: "outline" })
            )}
          >
            Stwórz wpis
          </Link>
        </EmptyPlaceholder>
      </div>
    </DashboardShell>
  )
}
