import { transformDate } from '@/utils/global.utils';
import { getPostDescription, getPostSlug } from '@/utils/post.utils';
import { type Post } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

type BlogPostsProps = {
  posts: Post[]
}

export function BlogPosts({
  posts: postsRaw,
}: BlogPostsProps) {
  const posts = postsRaw
    .map(post => ({
      ...post,
      image: 'https://s1.1zoom.me/b5050/878/Footbal_Men_Ball_Jump_544060_1920x1080.jpg',
      description: getPostDescription(post),
    }))

  return (
    <div className="container space-y-10 py-6 md:py-10">
      <section>
        {posts[0] && (
          <>
            <h2 className="mb-4 font-heading text-3xl">Polecany wpis</h2>
            <article className="relative grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                {posts[0].image && (
                  <Image
                    alt={posts[0].title}
                    className="w-full rounded-lg border object-cover object-center md:h-64 lg:h-72"
                    height={452}
                    src={posts[0].image}
                    width={804}
                  />
                )}
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="mb-2 text-balance font-heading text-2xl md:text-4xl">
                  {posts[0].title}
                </h3>
                <p className="line-clamp-3 text-balance text-muted-foreground md:text-lg">
                  {posts[0].description}
                </p>
                <Link href={`/blog/${getPostSlug(posts[0])}`} className="absolute inset-0">
                  <span className="sr-only">View Article</span>
                </Link>
              </div>
            </article>
          </>
        )}
      </section>

      {posts.slice(1)?.length > 0 &&
        <section>
          <h2 className="mb-4 font-heading text-3xl">Sprawdź pozostałe</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(1).map((post) => (
              <article key={post.id} className="group relative flex flex-col space-y-2">
                {post.image && (
                  <Image
                    alt={post.title}
                    src={post.image}
                    width={804}
                    height={452}
                    className="rounded-md border bg-muted transition-colors"
                  />
                )}
                <h2 className="line-clamp-1 font-heading text-2xl">{post.title}</h2>
                <p className="line-clamp-1 text-muted-foreground">{post.description}</p>
                <p className="text-sm text-muted-foreground">
                  {transformDate(post.updatedAt)}
                </p>
                <Link href={`/blog/${getPostSlug(post)}`} className="absolute inset-0">
                  <span className="sr-only">Zobacz wpis</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      }
    </div>
  );
}

