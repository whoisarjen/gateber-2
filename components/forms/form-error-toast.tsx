'use client'

import { useEffect } from "react"
import { toast } from "../ui/use-toast"
import { type FieldErrors } from "react-hook-form"

type FormErrorToastProps = {
    errors: FieldErrors
}

export const FormErrorToast = ({
    errors,
}: FormErrorToastProps) => {
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

    return null
}