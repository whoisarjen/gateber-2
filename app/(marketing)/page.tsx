import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/shared/icons"
import { PricingCards } from "@/components/pricing-cards"
import { PricingFaq } from "@/components/pricing-faq"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default async function IndexPage() {
  const isLoading = false

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
              <div className="mt-16 flex w-full max-w-xs flex-col gap-5">
                <h3 className="font-heading text-xl leading-[1.1] md:text-2xl">Free and Open-Source</h3>
                <p className="text-muted-foreground">
                  Lorem Ipsum is simply dummy text of the printing and industry.
                </p>
                <Link href="/">
                  Learn more
                </Link>
              </div>
              <div className="mt-16 flex w-full max-w-xs flex-col gap-5">
                <h3 className="font-heading text-xl leading-[1.1] md:text-2xl">Modern Design</h3>
                <p className="text-muted-foreground">
                  Lorem Ipsum is simply dummy text of the printing and industry.
                </p>
                <Link href="/">
                  Learn more
                </Link>
              </div>
              <div className="mt-16 flex w-full max-w-xs flex-col gap-5">
                <h3 className="font-heading text-xl leading-[1.1] md:text-2xl">SaaS Starter Kit</h3>
                <p className="text-muted-foreground">
                  Lorem Ipsum is simply dummy text of the printing and industry.
                </p>
                <Link href="/">
                  Learn more
                </Link>
              </div>
              <div className="mt-16 flex w-full max-w-xs flex-col gap-5">
                <h3 className="font-heading text-xl leading-[1.1] md:text-2xl">All Essential Integrations</h3>
                <p className="text-muted-foreground">
                  Lorem Ipsum is simply dummy text of the printing and industry.
                </p>
                <Link href="/">
                  Learn more
                </Link>
              </div>
              <div className="mt-16 flex w-full max-w-xs flex-col gap-5">
                <h3 className="font-heading text-xl leading-[1.1] md:text-2xl">Free and Open-Source</h3>
                <p className="text-muted-foreground">
                  Lorem Ipsum is simply dummy text of the printing and industry.
                </p>
                <Link href="/">
                  Learn more
                </Link>
              </div>
              <div className="mt-16 flex w-full max-w-xs flex-col gap-5">
                <h3 className="font-heading text-xl leading-[1.1] md:text-2xl">Modern Design</h3>
                <p className="text-muted-foreground">
                  Lorem Ipsum is simply dummy text of the printing and industry.
                </p>
                <Link href="/">
                  Learn more
                </Link>
              </div>
              <div className="mt-16 flex w-full max-w-xs flex-col gap-5">
                <h3 className="font-heading text-xl leading-[1.1] md:text-2xl">SaaS Starter Kit</h3>
                <p className="text-muted-foreground">
                  Lorem Ipsum is simply dummy text of the printing and industry.
                </p>
                <Link href="/">
                  Learn more
                </Link>
              </div>
              <div className="mt-16 flex w-full max-w-xs flex-col gap-5">
                <h3 className="font-heading text-xl leading-[1.1] md:text-2xl">All Essential Integrations</h3>
                <p className="text-muted-foreground">
                  Lorem Ipsum is simply dummy text of the printing and industry.
                </p>
                <Link href="/">
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mb-16 flex flex-col items-center text-center">
        <div className="mx-auto flex w-full flex-col items-center gap-8">
          <h2 className="text-gradient_indigo-purple p-0 font-heading text-3xl font-extrabold leading-[1.1] md:text-5xl">
            Nad czym się zastanawiasz?
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

      <div className="mb-16 flex flex-col gap-16">
        <PricingCards />
        <PricingFaq />
      </div>

      <section className="container mb-16">
        <div className="my-16 flex  flex-col items-center gap-16 xl:flex-row">
          <div className="flex w-full max-w-2xl flex-col justify-center gap-8 text-center">
            <h2 className="text-gradient_indigo-purple p-0 font-heading text-3xl font-extrabold leading-[1.1] md:text-5xl">
              Potrzebujesz Czegoś Więcej?
            </h2>
            <p className="max-w-[42rem] text-balance p-0 leading-normal text-muted-foreground sm:text-lg sm:leading-8">
              W naszym świecie innowacji, nieustannego rozwoju i nieograniczonych możliwości, wiemy, że czasem szukasz czegoś więcej. Tutaj, w Gateber, rozumiemy Twoje potrzeby i chcemy być Twoim partnerem w osiągnięciu sukcesu.
            </p>
          </div>
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <form className="flex w-full max-w-96 flex-1 flex-col gap-4">
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
              disabled={isLoading}
              // {...register("email")}
            />
            <Label htmlFor="title">
              Tytuł
            </Label>
            <Input
              id="title"
              placeholder="Propozycja ulepszenia Gateber"
              disabled={isLoading}
              // {...register("title")}
            />
            <Label htmlFor="message">
              Wiadomość
            </Label>
            <Textarea
              id="message"
              placeholder="W czym możemy Ci pomóc?"
              className="h-auto"
              disabled={isLoading}
              rows={8}
              // {...register("message")}
            />
            <button className={cn(buttonVariants())} disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              )}
              Wyślij
            </button>
          </form>
        </div>
      </section>
    </>
  )
}