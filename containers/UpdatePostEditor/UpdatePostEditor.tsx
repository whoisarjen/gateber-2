'use client'

import { Editor } from "@/components/editor/Editor";
import { buttonVariants } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { updatePostSchema, type UpdatePostSchema } from "@/schemas/posts.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { react } from "@/app/_trpc/client";
import { useRef } from "react";
import EditorJS from '@editorjs/editorjs'
import { toast } from "@/components/ui/use-toast";
import { type Post } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";

type UpdatePostEditorProps = {
  post: Post
}

export const UpdatePostEditor = ({
  post,
}: UpdatePostEditorProps) => {
    const router = useRouter()
    const editorRef = useRef<EditorJS>()
    const useFormState = useForm<UpdatePostSchema>({
      criteriaMode: "all",
      resolver: zodResolver(updatePostSchema),
      defaultValues: {
        id: post.id,
        title: post.title,
        isPublic: post.isPublic,
        content: post.content as unknown as { [x: string]: any },
      },
    })

    const updatePost = react.posts.update.useMutation()
    const deletePost = react.posts.delete.useMutation({
      onSuccess: () => {
        router.push('/dashboard')
      }
    })

    const onSubmit = async (data: UpdatePostSchema) => {
      const content = await editorRef.current?.save() as unknown as UpdatePostSchema["content"]

      await updatePost.mutateAsync({
        ...post,
        ...data,
        content,
      },
      {
        onSuccess: async (post) => {
          toast({
            title: "Wpis zapisany.",
            description: `Twój wpis będzie ${post.isPublic ? 'widoczny' : 'niewidoczny'} dla innych użytkowników dopóki nie zmienisz widoczności.`,
          })
        }
      })
    }

    const isLoading = updatePost.isPending || deletePost.isPending

    return (
        <DashboardShell>
          <DashboardHeader heading="Edytowanie wpisu" text={`Edytujesz wpis "${post.title}"`}>
            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    disabled={isLoading}
                    className={buttonVariants({ 'variant': 'destructive' })}
                  >
                    {isLoading
                      ? <ReloadIcon className="h-4 w-4 animate-spin" />
                      : 'Usuń'
                    }
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Czy chcesz usunąć wpis?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Potwierdzając, usuniesz obecnie edytowany wpis. Ta akcje nie może być cofnięta.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Anuluj</AlertDialogCancel>
                    <AlertDialogAction
                      disabled={isLoading}
                      onClick={() => deletePost.mutate(post)}
                      className={buttonVariants({ 'variant': 'destructive' })}
                    >
                      {isLoading
                        ? <ReloadIcon className="h-4 w-4 animate-spin" />
                        : 'Usuń wpis'
                      }
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                disabled={isLoading}
                onClick={useFormState.handleSubmit(onSubmit)}
                className={buttonVariants({})}
              >
                {isLoading
                  ? <ReloadIcon className="h-4 w-4 animate-spin" />
                  : 'Zapisz'
                }
              </Button>
            </div>
          </DashboardHeader>
            {/* @ts-expect-error id might be undefined and its fine */}
            <Editor
                {...useFormState}
                post={post}
                editorRef={editorRef}
                handleSubmit={() => useFormState.handleSubmit(onSubmit)}
            />
        </DashboardShell>
    )
}