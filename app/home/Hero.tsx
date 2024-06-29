
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <>
            <section
          data-theme="default"
          id="hero"
          className="flex h-[97vh] flex-col items-center justify-center gap-12"
        >
          <Image src="/gitmystat.png" alt="Logo" className="scale-80 lg:scale-100" width={200} height={200} />
          <h1 className="text-center text-4xl lg:text-6xl font-bold">gitMyStat!</h1>
          <p className="text-accent text-center text-lg lg:text-xl lg:max-w-none max-w-[400px] font-medium">
            Turn your GitHub activity into sleek stats and cool visuals
          </p>
        </section>
        <section
          data-theme="default"
          id="features"
          className="dark:bg-dark-background dark:border-dark-border bg-light-background border-light-border flex min-h-screen w-full flex-col justify-center gap-32 border-t-2 border-solid px-12 py-16 lg:flex-row lg:px-48"
        >
          <div className="flex flex-col items-start gap-12 lg:items-start lg:justify-center">
            <div className="flex flex-col items-start gap-3">
              <h2 className="dark:text-dark-color text-light-color text-4xl font-bold">
                Turn your stats into eyecandy
              </h2>
              <p className="dark:text-dark-accent text-light-accent max-w-[800px] text-xl font-medium">
                gitMyStat! is a helpful project that generates an image svg with
                your GitHub stats and activity in a sleek and modern way.
              </p>
            </div>
            <picture>
              <source
                srcSet="/top?username=rahuletto&layout=bar"
                media="(prefers-color-scheme: dark)"
              />
              <Image
                width={300}
                height={260}
                loading="lazy"
                src="/top?username=rahuletto&layout=bar&theme=light"
                alt="Top languages"
              />
            </picture>
          </div>

          <div className="flex flex-col items-start gap-12 lg:flex-col-reverse lg:items-center lg:justify-center">
            <div className="flex flex-col items-start gap-3 lg:items-end">
              <h2 className="dark:text-dark-color text-light-color text-left text-4xl font-bold lg:text-right">
                Modernized
              </h2>
              <p className="dark:text-dark-accent text-light-accent max-w-[800px] text-left text-xl font-medium lg:text-right">
                My mission is to modernize the README visuals of github with
                stunning statistics of other{"'"}s work and progress.
              </p>
            </div>
            <picture className="flex w-full lg:justify-end">
              <source
                srcSet="/user?username=rahuletto"
                media="(prefers-color-scheme: dark)"
              />
              <Image
                width={285}
                height={340}
                src="/user?username=rahuletto&theme=light"
                alt="User"
              />
            </picture>
          </div>
        </section>
        <section
          data-theme="dino"
          className="dark:bg-dino-background dark:border-dino-border bg-dino-light-background border-dino-light-border flex min-h-screen w-full flex-col justify-center gap-32 border-t-2 border-solid px-12 py-16 lg:flex-row lg:px-48"
        >
          <div className="flex flex-col items-start justify-start gap-12 lg:flex-col-reverse lg:items-center lg:justify-center">
            <div className="mx-auto flex flex-col items-start gap-3">
              <h2 className="dark:text-dino-color text-dino-light-color w-full text-4xl font-bold lg:text-center">
                Awesome flavors
              </h2>
              <p className="dark:text-dino-accent text-dino-light-accent max-w-[800px] text-xl font-medium lg:mx-auto lg:text-center">
                Give a little touch of your personal taste to the stats with the
                themes available. Heavily inspired from{" "}
                <Link
                  className="text-dino-border font-semibold underline"
                  href="https://monkeytype.com"
                >
                  MonkeyType
                </Link>{" "}
                themes. But it doesn{"'"}t stop there, you can customize
                everything for your liking.
              </p>
            </div>
            <picture>
              <source
                srcSet="/recent?username=rahuletto&theme=dino"
                media="(prefers-color-scheme: dark)"
              />
              <Image
                width={410}
                height={110}
                loading="lazy"
                src="/recent?username=rahuletto&theme=dino-light"
                alt="Recent"
              />
            </picture>
          </div>
        </section>

        <section
          data-theme="catppuccin"
          className="dark:bg-catppuccin-border dark:border-catppuccin-background bg-catppuccin-light-background border-catppuccin-light-border flex min-h-screen w-full flex-col justify-center gap-32 border-t-2 border-solid px-12 py-16 lg:flex-row lg:px-48"
        >
          <div className="flex flex-col items-start gap-12 lg:flex-col-reverse lg:items-start lg:justify-center">
            <div className="flex flex-col items-start gap-3">
              <h2 className="dark:text-catppuccin-color text-catppuccin-light-color text-4xl font-bold">
                Soothing Animations
              </h2>
              <p className="dark:text-catppuccin-accent text-catppuccin-light-accent max-w-[800px] text-xl font-medium">
                What{"'"}s better than a static sticker? An animated one! With
                lazy-loading, you can acheive an animated sticker with ease.
              </p>
            </div>
            <picture>
              <source
                srcSet="/wakatime?username=rahuletto&theme=catppuccin&layout=bar"
                media="(prefers-color-scheme: dark)"
              />
              <Image
                width={300}
                height={337}
                loading="lazy"
                src="/wakatime?username=rahuletto&theme=catppuccin-light&layout=bar"
                alt="Recent"
              />
            </picture>
          </div>

          <div className="flex flex-col items-start gap-12 lg:items-end lg:justify-center">
            <div className="flex flex-col items-start gap-3 lg:items-end">
              <h2 className="dark:text-catppuccin-color text-catppuccin-light-color text-left text-4xl font-bold lg:text-right">
                Well optimized
              </h2>
              <p className="dark:text-catppuccin-accent text-catppuccin-light-accent max-w-[800px] text-left text-xl font-medium lg:text-right">
                Using edge networks, the stats are cached for a longer period of
                1 hour, with benefits of lower latency and improved performance.
              </p>
            </div>
            <picture>
              <source
                srcSet="/wakatime?username=rahuletto&layout=compact&theme=catppuccin"
                media="(prefers-color-scheme: dark)"
              />
              <Image
                width={480}
                height={130}
                loading="lazy"
                src="/wakatime?username=rahuletto&layout=compact&theme=catppuccin-light"
                alt="Top compact"
              />
            </picture>
          </div>
        </section>
        <section
          data-theme="cyred"
          className="dark:bg-cyred-background dark:border-cyred-border bg-cyred-light-background border-cyred-light-border relative flex min-h-screen w-full flex-col items-start justify-evenly gap-32 border-t-2 border-solid px-12 py-16 lg:items-center lg:px-48"
        >
          <div className="flex flex-col items-start gap-12 lg:items-center lg:justify-center">
            <div className="mx-auto flex flex-col items-start gap-3">
              <h2 className="dark:text-cyred-color text-cyred-light-color w-full text-4xl font-bold lg:text-center">
                AAAAAAAAA *crash*
              </h2>
              <p className="dark:text-cyred-accent text-cyred-light-accent max-w-[800px] text-xl font-medium lg:mx-auto lg:text-center">
                Imagine, what if these stats are crutial for your README? I got
                you covered with amazing error handling, which tells you what
                {"'"}s wrong instead of{" "}
                <i className="dark:text-cyred-color text-cyred-light-color font-bold">
                  silence
                </i>
                .
              </p>
            </div>
            <picture>
              <source
                srcSet="/recent?username=rahulmarban&theme=cyred"
                media="(prefers-color-scheme: dark)"
              />
              <Image
                width={500}
                height={170}
                loading="lazy"
                src="/recent?username=rahulmarban&theme=cyred-light"
                alt="Error"
              />
            </picture>
          </div>
          <Image src="/fine.jpg" alt="This is fine" width={200} height={200} />
        </section>

        <section
          data-theme="gold"
          className="dark:bg-gold-background dark:border-gold-border bg-gold-light-background border-gold-light-border flex min-h-screen w-full flex-col justify-center gap-48 border-t-2 border-solid px-12 py-8 lg:px-48"
        >
          <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex max-w-[800px] flex-col items-start gap-3">
              <h2 className="dark:text-gold-color text-gold-light-color text-4xl font-bold">
                Open Source
              </h2>
              <p className="dark:text-gold-accent text-gold-light-accent max-w-[800px] text-xl font-medium">
                gitMyStat! is an open-source project that is free to use and
                contribute to. Built with Next.js and TailwindCSS, with safety
                of Typescript.
              </p>
            </div>
            <picture>
              <source
                srcSet="/repo?username=rahuletto&repo=gitMyStat&theme=gold"
                media="(prefers-color-scheme: dark)"
              />
              <Image
                width={500}
                height={170}
                loading="lazy"
                src="/repo?username=rahuletto&repo=gitMyStat&theme=gold-light"
                alt="GitHub"
              />
            </picture>
          </div>
        </section>

    </>
  )
}
