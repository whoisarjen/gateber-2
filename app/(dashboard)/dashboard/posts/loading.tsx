import { CardSkeleton } from "@/components/shared/card-skeleton"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Panel" text="Twórz i zarządzaj swoimi wpisami.">
        <Link
          href="/dashboard/posts/create"
          className={cn(
            buttonVariants({})
          )}
        >
          Stwórz wpis
        </Link>
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
