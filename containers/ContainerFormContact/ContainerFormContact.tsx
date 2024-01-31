import { FormContact } from "@/components/forms/form-contact"

export const ContainerFormContact = () => {
    return (
        <section className="container mb-16">
            <div className="my-16 flex flex-col items-center gap-16 lg:flex-row">
                <div className="flex flex-1 flex-col items-center gap-8 text-center">
                    <h2 className="text-gradient_indigo-purple p-0 font-heading text-3xl font-extrabold leading-[1.1] md:text-5xl">
                    Potrzebujesz Czegoś Więcej?
                    </h2>
                    <p className="max-w-[42rem] text-balance p-0 leading-normal text-muted-foreground sm:text-lg sm:leading-8">
                    Wypełnij nasz formularz kontaktowy, a my skontaktujemy się z Tobą, aby zrozumieć Twoje cele i wyzwania. Nasz zespół jest gotów dostarczyć Ci spersonalizowane rozwiązania, które napędzą rozwój Twojego biznesu.
                    </p>
                </div>
                <FormContact />
            </div>
        </section>
    )
}
