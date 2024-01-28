'use client'

import EditorJS, { type OutputData } from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Post } from '@prisma/client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { type CreatePostSchema, createPostSchema } from '@/schemas/posts.schema'
import { Textarea } from "@/components/ui/textarea"
import { buttonVariants } from "@/components/ui/button"
import { DashboardHeader } from '../dashboard/header'
import { DashboardShell } from '../dashboard/shell'
import { react } from '@/app/_trpc/client'
import { revalidatePath } from 'next/cache'
import { toast } from '../ui/use-toast'
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { getPostSlug } from '@/utils/post.utils'

type EditorProps = {
  post?: Post
}

export const Editor = ({
  post,
}: EditorProps) => {
  const router = useRouter()

  // @ts-ignore
  const createPost = react.posts.create.useMutation({
    onSuccess: (post) => {
      revalidatePath('/dashboard')
      router.push(`/dashboard/edit/${getPostSlug(post)}`)
    }
  })

  //   const updatePost = api.post.update.useMutation({
  //     onSuccess: (post) => {
  //       router.push(getHrefToPost(post))
  //     },
  //   });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostSchema>({
    criteriaMode: "all",
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: post?.title ?? '',
      isPublic: post?.isPublic ?? false,
      content: (post?.content ?? {}) as unknown as any,
    },
  })
  const ref = useRef<EditorJS>()
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

  const onSubmit = async (data: CreatePostSchema) => {
    const content = await ref.current?.save() as unknown as CreatePostSchema["content"]

    if (post) {
      const update = {
        ...post,
        ...data,
        content,
      }

      //   updatePost.mutate(update)
      //   customRevalidatePath('/dashboard/edit/[postId]')
      //   customRevalidatePath(getHrefToPost(update))
      return
    }

    createPost.mutate({
      ...data,
      content,
    })
  }

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
    <DashboardShell>
      <DashboardHeader heading="Tworzenie wpisy" text="Domyślnie wpis jest niepubliczny. Musisz znienić jego ustawienia widoczności w trakcie edytowania.">
        <Button
          onClick={handleSubmit(onSubmit)}
          className={buttonVariants({})}
        >
          {true
            ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            : 'Zapisz'
          }
        </Button>
      </DashboardHeader>
      <form
        id='subreddit-post-form'
        className='prose-xl flex-1'
        onSubmit={handleSubmit(onSubmit)}>
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
    </DashboardShell>
  )
}
