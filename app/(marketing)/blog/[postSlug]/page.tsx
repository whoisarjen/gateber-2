import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { env } from "@/env.mjs"
import { absoluteUrl, cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/shared/icons"
import { api } from "@/app/_trpc/server"
import { getPostDescription, getPostIdFromSlug, getPostSlug } from "@/utils/post.utils"
import { transformDate } from "@/utils/global.utils"
import { type OutputData } from "@editorjs/editorjs";
import editorJsHtml from 'editorjs-html'


interface PostPageProps {
  params: {
    postSlug: string
  }
}

const EditorJsToHtml = editorJsHtml();
type ParsedContent = string | JSX.Element;

export async function generateMetadata({
  params: {
    postSlug,
  },
}: PostPageProps): Promise<Metadata> {
  // TODO remove isOnlyPublic
  const post = await api.posts.getPost({ id: getPostIdFromSlug(postSlug), isOnlyPublic: false })
  const description = getPostDescription(post)

  const url = env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", post.title)
  ogUrl.searchParams.set("type", "Blog Post")
  ogUrl.searchParams.set("mode", "dark")

  return {
    title: post.title,
    description: description,
    authors: [{
      name: post.user.name ?? '',
    }],
    openGraph: {
      title: post.title,
      description: description,
      type: "article",
      url: absoluteUrl(getPostSlug(post)),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      images: [ogUrl.toString()],
    },
  }
}

// TODO turn ON generateStaticParams
// export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
//   const { posts } = await api.posts.getPosts({ isIgnoreTakeLimit: true })

//   return posts.map(post => ({
//     postSlug: getPostSlug(post),
//   }))
// }

export default async function PostPage({
  params: {
    postSlug,
  },
}: PostPageProps) {
  // TODO remove isOnlyPublic
  const post = await api.posts.getPost({ id: getPostIdFromSlug(postSlug), isOnlyPublic: false })
  const html = EditorJsToHtml.parse(post.content as unknown as OutputData) as ParsedContent[]

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <Icons.chevronLeft className="mr-2 size-4" />
        Zobacz pozostałe
      </Link>
      <div>
        <time
          dateTime={new Date(post.updatedAt).toString()}
          className="block text-sm text-muted-foreground"
        >
          Ostatnia akutalizacja dnia {transformDate(post.updatedAt)}
        </time>
        <h1 className="mt-2 inline-block text-balance font-heading text-4xl leading-tight lg:text-5xl">
            {post.title}
        </h1>
        <div className="mt-4 flex space-x-4">
          <Link
            href={`https://twitter.com/${post.user.twitter}`}
            className="flex items-center space-x-2 text-sm"
            target="_blank"
          >
            <Image
              src={post.user.image ?? ''}
              alt={post.user.name ?? ''}
              width={42}
              height={42}
              className="rounded-full bg-white"
            />
            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{post.user.name}</p>
              <p className="text-[12px] text-muted-foreground">
                @{post.user.twitter}
              </p>
            </div>
          </Link>
        </div>
      </div>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-muted transition-colors"
          priority
        />
      )}
      <div className="prose max-w-full dark:prose-invert" key={(post.content as unknown as OutputData)?.time}>
        {html.map((item, index) => {
          if (typeof item === "string") {
            return (
              <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
            );
          }

          return item;
        })}
      </div>
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <Icons.chevronLeft className="mr-2 size-4" />
          Zobacz pozostałe
        </Link>
      </div>
    </article>
  )
}
