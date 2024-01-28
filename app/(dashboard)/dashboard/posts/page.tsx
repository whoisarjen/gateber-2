import { redirect } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import Link from "next/link"
import { api } from "@/app/_trpc/server"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { transformDate } from "@/utils/global.utils"
import { getPostSlug } from "@/utils/post.utils"
import { PaginationComponent } from "@/components/shared/PaginationComponent"

export const metadata = {
  title: "Wpisy",
}

type DashboardPageProps = {
  searchParams: {
    page?: string
  }
}

export default async function DashboardPostsPage({
  searchParams,
}: DashboardPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const {
    page,
    posts,
    pageCount,
  } = await api.posts.getPosts({ isOnlyPublic: false, page: searchParams.page })

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
      {posts.length === 0
       ? (
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
       )
       : (
        <div>
          {posts.map(({ id, title, updatedAt }) => (
            <Link href={`/dashboard/posts/${getPostSlug({ id, title })}`}>
              <Card key={id}>
                <CardHeader className="gap-2">
                  {title}
                </CardHeader>
                <CardContent className="h-10" />
                <CardFooter>
                  Ostatnia zmiana dnia {transformDate(updatedAt)}
                </CardFooter>
              </Card>
            </Link>
          ))}
          <PaginationComponent
            page={page}
            pageCount={pageCount}
            href="/dashboard/posts"
            className="mt-4"
          />
        </div>
       )}
    </DashboardShell>
  )
}
