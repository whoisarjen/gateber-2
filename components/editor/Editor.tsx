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

type EditorProps = {
  post?: Post
}

export const Editor = ({
  post,
}: EditorProps) => {
  const router = useRouter()
  //   const createPost = api.post.create.useMutation({
  //     onSuccess: (post) => {
  //       router.push(`/dashboard/edit/${post.id}`)
  //     },
  //   });

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
      //   isPublic: post?.isPublic ?? false,
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

    // customRevalidatePath('/dashboard/create')
    // createPost.mutate({
    //   ...data,
    //   content,
    // })
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
      {Object.values(errors).map(({ type, message }: any) => (
        <p
          key={type}
          className="text-warning"
        >
          {message}
        </p>
      ))}
      <DashboardHeader heading="Tworzenie wpisy" text="Domyślnie wpis jest niepubliczny. Musisz znienić jego ustawienia widoczności w trakcie edytowania.">
        <button className={buttonVariants({})}>
          Zapisz
        </button>
        {/* {!!post &&
            <div>
              <Controller
                control={control}
                name="isPublic"
                render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                    control={<Switch
                      checked={value}
                      onChange={onChange}
                      color="primary"
                    />}
                    label={value ? 'Publiczny' : 'Prywatny'}
                    labelPlacement="start"
                  />
                )}
              />
            </div>
          } */}
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
