'use client'

import EditorJS, { type OutputData } from '@editorjs/editorjs'
import { type Post } from '@prisma/client'
import { type MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { type UseFormReturn } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from '../ui/use-toast'

type EditorProps = {
  post?: Post
  handleSubmit: VoidFunction
  editorRef: MutableRefObject<EditorJS | undefined>
} & UseFormReturn<{
  title: string;
  content: {} & {
      [k: string]: any;
  };
  isPublic: boolean;
  id?: number
}, any, undefined>

export const Editor = ({
  post,
  handleSubmit,
  editorRef: ref,
  register,
  formState: { errors },
}: EditorProps) => {
  //   const updatePost = api.post.update.useMutation({
  //     onSuccess: (post) => {
  //       router.push(getHrefToPost(post))
  //     },
  //   });

  const _titleRef = useRef<HTMLTextAreaElement>(null)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    const Table = (await import('@editorjs/table')).default
    const List = (await import('@editorjs/list')).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        placeholder: 'Tu zacznij pisać swój wpis...',
        inlineToolbar: true,
        data: post?.content as unknown as OutputData ?? { blocks: [] },
        tools: {
          header: Header,
          list: List,
          table: Table,
        },
      })
    }
  }, [post?.id])

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value
        toast({
          title: 'Coś poszło nie tak.',
          description: (value as { message: string }).message,
          variant: "destructive",
        })
      }
    }
  }, [errors])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      await initializeEditor()

      setTimeout(() => {
        _titleRef?.current?.focus()
      }, 0)
    }

    if (isMounted) {
      void init()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  // const onSubmit = async (data: CreatePostSchema) => {
  //   const content = await ref.current?.save() as unknown as CreatePostSchema["content"]

  //   if (post) {
  //     const update = {
  //       ...post,
  //       ...data,
  //       content,
  //     }

  //     return
  //   }

  //   await createPost.mutateAsync({
  //     ...data,
  //     content,
  //   },
  //   {
  //     onSuccess: (post) => {
  //       customRevalidatePath('/dashboard/posts')
  //       router.push(`/dashboard/posts/${getPostSlug(post)}`)
  //     }
  //   })
  // }

  if (!isMounted) {
    return null
  }

  const auto_grow = () => {
    if (!_titleRef.current) {
      return
    }

    _titleRef.current.style.height = _titleRef.current.scrollHeight + 'px'
  }

  const { ref: titleRef, ...rest } = register('title')

  return (
    <form
      id='subreddit-post-form'
      className='prose-xl flex-1'
      onSubmit={handleSubmit}>
      <Textarea
        ref={(e: any) => {
          titleRef(e)
          // @ts-expect-error it's fine, trust me!
          _titleRef.current = e
        }}
        {...rest}
        onInput={auto_grow}
        placeholder='Tytuł wpisu'
        className='reset-textarea w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold'
      />
      <div id='editor' />
    </form>
  )
}
