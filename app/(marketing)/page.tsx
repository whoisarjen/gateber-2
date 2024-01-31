import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/shared/icons"
import { ContainerFormContact } from "@/containers/ContainerFormContact"

const FEATURES = [
  {
    header: '5 Sekund od Pisania',
    description: 'Lorem Ipsum is simply dummy text of the printing and industry.',
    isAvailable: true,
  },
  {
    header: 'Monetyzacja na Kliknięcie',
    description: 'To ty decydujesz czy dany wpis będzie publiczny, dostępny tylko dla obserwujących lub płatny.',
    isAvailable: false,
  },
  {
    header: 'Marka Osobista Prawem',
    description: 'Stawiamy na Ciebie. Każdy wpis, który stworzysz będzie miał odnościniki do Twoich mediów społecznościowych.',
    isAvailable: true,
  },
  {
    header: 'Inteligentne Powiadomienia',
    description: 'Każdy tworzony przez Ciebie materiał będzie docierał do twoich obserwujących.',
    isAvailable: false,
  },
  {
    header: 'Newsletter Nowej Generacji',
    description: 'Obserwujący są odbiorcami Twojego Newslettera. Bez błagania o email.',
    isAvailable: false,
  },
  {
    header: 'Skuteczna Promocja',
    description: 'Lorem Ipsum is simply dummy text of the printing and industry.',
    isAvailable: true,
  },
  {
    header: 'SEO to Nareście Przeszłość',
    description: 'Żmudne i drogie działania SEO są przeszłością. Skupiasz się na tym, co kochasz - tworzeniu dobrych treści.',
    isAvailable: false,
  },
  {
    header: 'Każdy Zyskuje',
    description: 'Lorem Ipsum is simply dummy text of the printing and industry.',
    isAvailable: true,
  },
]

export default async function IndexPage() {
  return (
    <>
    <section className="main-section-min-height flex items-center justify-center space-y-6 lg:py-28">
        <div className="container flex max-w-[64rem] flex-col items-center gap-5 text-center">
          <Link
            href="https://twitter.com/miickasmt/status/1719892161095745801"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "animate-fade-up opacity-0")}
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            target="_blank"
          >
            Obserwuj nas na <Icons.twitter className="ml-2 size-4" />
          </Link>

          <h1
            className="animate-fade-up text-balance font-urban text-4xl font-extrabold tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            Odkrywaj, Twórz i Dyskutuj na Każdy Temat w{" "}
            <span className="text-gradient_indigo-purple font-extrabold">
              Gateber
            </span>
          </h1>

          <p
            className="max-w-[42rem] animate-fade-up text-balance leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            Teraz masz szansę przekształcić swoją pasję, umiejętności i treści w realne zarobki. Gateber oferuje innowacyjne rozwiązania dla twórców treści oraz odbiorców.
          </p>

          <div className="flex gap-6">
            <div
              className="flex animate-fade-up justify-center space-x-2 opacity-0 md:space-x-4"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
                Dołącz do Gateber
              </Link>
            </div>

            <div
              className="flex animate-fade-up justify-center space-x-2 opacity-0 md:space-x-4"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              <Link href="#features" className={cn(buttonVariants({ size: "lg", variant: 'outline' }))} id="features">
                Dowied się więcej
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mb-16 flex flex-col items-center">
        <div className="mx-auto mb-10 flex w-full flex-col">
          <div className="flex flex-col gap-5">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Features</p>
            <h2 className="text-gradient_indigo-purple font-heading text-3xl font-extrabold leading-[1.1] md:text-5xl">
              Main Features Of Play
            </h2>
            <p className="max-w-lg text-muted-foreground">
              There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap justify-around">
              {FEATURES.map(feature => (
                <div className="mt-16 flex w-full max-w-xs flex-col gap-5" key={feature.header}>
                  <h3 className="font-heading text-xl leading-[1.1] md:text-2xl">{feature.header}</h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                  {!feature.isAvailable && 
                    <p className="mt-auto text-sm font-medium uppercase tracking-widest text-muted-foreground">Wkrótce</p>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mb-16 flex flex-col items-center text-center">
        <div className="mx-auto flex w-full flex-col items-center gap-8">
          <h2 className="text-gradient_indigo-purple p-0 font-heading text-3xl font-extrabold leading-[1.1] md:text-5xl">
            Nad czym się zastanawiasz?
          </h2>
          <p className="max-w-[42rem] text-balance p-0 leading-normal text-muted-foreground sm:text-lg sm:leading-8">
            W Gateber, wierzymy w siłę działań i chwytania okazji. Dlatego pytamy: Nad czym się zastanawiasz? Moment na przyspieszenie swojego sukcesu jest teraz, a my jesteśmy tu, aby Ci w tym pomóc.
          </p>
          <div className="flex justify-center space-x-2 md:space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Dołącz do Gateber
            </Link>
          </div>
        </div>
      </section>

      {/* <div className="mb-16 flex flex-col gap-16">
        <PricingCards />
        <PricingFaq />
      </div> */}

      <ContainerFormContact />
    </>
  )
}