'use client'

import { Editor } from "@/components/editor/Editor";
import { buttonVariants } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { type CreatePostSchema, createPostSchema } from "@/schemas/posts.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { react } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { getPostSlug } from "@/utils/post.utils"
import { useRef } from "react";
import EditorJS from '@editorjs/editorjs'
import { toast } from "@/components/ui/use-toast";

export const CreatePostEditor = () => {
    const router = useRouter()
    const editorRef = useRef<EditorJS>()
    const useFormState = useForm<CreatePostSchema>({
      criteriaMode: "all",
      resolver: zodResolver(createPostSchema),
      defaultValues: {
        title: '',
        isPublic: false,
        content: {},
      },
    })

    const {
        handleSubmit,
    } = useFormState

    const createPost = react.posts.create.useMutation()

    const onSubmit = async (data: CreatePostSchema) => {
      const content = await editorRef.current?.save() as unknown as CreatePostSchema["content"]

      await createPost.mutateAsync({
        ...data,
        content,
      },
      {
        onSuccess: async (post) => {
          router.push(`/dashboard/posts/${getPostSlug(post)}`)
          toast({
            title: "Wpis zapisany.",
            description: "Kiedy będziesz gotowy, pamiętaj o zmianie jego widoczności na publiczny.",
          })
        }
      })
    }

    return (
        <DashboardShell>
          <DashboardHeader heading="Tworzenie wpisu" text="Domyślnie wpis jest niepubliczny. Musisz znienić jego ustawienia widoczności w trakcie edytowania.">
            <Button
              onClick={handleSubmit(onSubmit)}
              className={buttonVariants({})}
            >
              {createPost.isPending
                ? <ReloadIcon className="h-4 w-4 animate-spin" />
                : 'Zapisz'
              }
            </Button>
          </DashboardHeader>
            <Editor
                {...useFormState}
                editorRef={editorRef}
                handleSubmit={() => handleSubmit(onSubmit)}
            />
        </DashboardShell>
    )
}