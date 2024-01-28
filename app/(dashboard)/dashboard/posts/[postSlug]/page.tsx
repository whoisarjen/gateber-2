import { api } from "@/app/_trpc/server";
import { UpdatePostEditor } from "@/containers/UpdatePostEditor";
import { getPostIdFromSlug } from "@/utils/post.utils";

interface DashboardPostsPostSlugPageProps {
  params: {
    postSlug: string
  }
}

export default async function DashboardPostsPostSlugPage ({
    params: {
        postSlug,
    },
}: DashboardPostsPostSlugPageProps) {
    const post = await api.posts.getPost({ id: getPostIdFromSlug(postSlug) })

    return (
        <UpdatePostEditor post={post} />
    )
}
