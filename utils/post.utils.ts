import slugify from "slugify";
import { type Post } from "@prisma/client";

export const getPostSlug = ({ id, title }: Pick<Post, 'id' | 'title'>): string => {
    return `${slugify(`${id}-${title}`)}`
}