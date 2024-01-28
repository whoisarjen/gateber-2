import slugify from "slugify";
import { type Post } from "@prisma/client";
import { type OutputData } from "@editorjs/editorjs";

export const getPostSlug = ({ id, title }: Pick<Post, 'id' | 'title'>): string => {
    return `${slugify(`${id}-${title}`)}`
}

export const getPostIdFromSlug = (postSlug: string) => {
    return postSlug.slice(0, postSlug.indexOf('-'))
}

export const getPostDescription = (post: Post): string => {
    return (post.content as unknown as OutputData)
      .blocks
      .filter(({ type }) => type === "paragraph")
      .map(({ data: { text } }) => text)
      .join()
}
