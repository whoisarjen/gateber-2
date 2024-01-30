'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormErrorToast } from "./form-error-toast"
import { cn } from "@/lib/utils"
import { ContactFormSchema, contactFormSchema } from "@/schemas/generic.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Icons } from "../shared/icons"
import { buttonVariants } from "../ui/button"
import { react } from "@/app/_trpc/client"
import { toast } from "../ui/use-toast"

export const FormContact = () => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<ContactFormSchema>({
      resolver: zodResolver(contactFormSchema),
    })

    const contact = react.generic.contact.useMutation()
  
    const onSubmit = async (data) => {
      contact.mutateAsync(data)
        .then(() => {
          toast({
            title: 'Hura!',
            description: 'Wiadomość została dostarczona',
          })
          reset()
        })
        .catch(() => {
          toast({
            title: 'Coś poszło nie tak.',
            description: 'Wiadomość nie została wysłana, spróbuj później.',
            variant: "destructive",
          })
        })
    }

    return (
        <form className="flex w-full max-w-96 flex-1 flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="email@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={contact.isPending}
            {...register("email")}
          />
          <Label htmlFor="subject">
            Tytuł
          </Label>
          <Input
            id="subject"
            placeholder="Propozycja ulepszenia Gateber"
            disabled={contact.isPending}
            {...register("subject")}
          />
          <Label htmlFor="message">
            Wiadomość
          </Label>
          <Textarea
            id="message"
            placeholder="W czym możemy Ci pomóc?"
            className="h-auto"
            disabled={contact.isPending}
            rows={8}
            {...register("message")}
          />
          <button className={cn(buttonVariants())} disabled={contact.isPending}>
            {contact.isPending && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            Wyślij
          </button>
          <FormErrorToast errors={errors} />
        </form>
    )
}