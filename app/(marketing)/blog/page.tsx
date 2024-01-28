import { BlogPosts } from "@/components/blog-posts"
import { api } from "@/app/_trpc/server"
import { PaginationComponent } from "@/components/shared/PaginationComponent"

export const metadata = {
  title: "Blog",
}

type BlogPageProps = {
  searchParams: {
    page?: string
  }
}

export default async function BlogPage({
  searchParams,
}: BlogPageProps) {
  // TODO remove isOnlyPublic
  const { posts, page, pageCount } = await api.posts.getPosts({ isOnlyPublic: false, take: 7, page: searchParams.page })

  return (
    <main>
      <BlogPosts posts={posts} />
      <PaginationComponent
        page={page}
        pageCount={pageCount}
        href="/blog"
        className=""
      />
    </main>
  )
}
