import dynamic from "next/dynamic";

const Card = dynamic(() => import("./Card"), {
  ssr: false,
});

export default function Config() {
  return (
    <>
      <section
        data-theme="default"
        id="config"
        className="dark:bg-dark-background dark:border-dark-border bg-light-background border-light-border flex min-h-screen w-full flex-col items-start justify-start gap-12 border-t-2 border-solid px-12 py-16 lg:px-48"
      >
        <h2 className="text-center text-5xl font-bold">Config</h2>
        <div className="flex flex-col justify-start">
          <p className="text-lg">
            Base URL:{" "}
            <code className="bg-background dark:text-color border-tip flex select-all rounded-xl border-2 px-4 py-2">
              https://gitmystat.vercel.app/
            </code>
          </p>
        </div>
        <div className="flex flex-col justify-start">
          <h3 className="text-left text-3xl font-bold">Cards</h3>
          <p className="max-w-[800px] text-lg">
            These are the list of card component to display your GitHub profile,
            repository, and more. The card component is a dynamic component that
            can be configured.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <h4 className="text-left text-3xl font-bold">User</h4>
          <div className="grid w-full gap-12 rounded-xl"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(24rem, 1fr))",
              gridTemplateRows: "min-content",
            }}>
            <Card
              url="/user?username=rahuletto"
              text="/user?username=rahuletto"
              width={285}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <h4 className="text-left text-3xl font-bold">Recent</h4>
          <div className="grid w-full gap-12 rounded-xl"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(24rem, 1fr))",
              gridTemplateRows: "min-content",
            }}>
            <Card
              url="/recent?username=rahuletto"
              text="/recent?username=rahuletto"
              width={300}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <h4 className="text-left text-3xl font-bold">Repo</h4>
          <div className="grid w-full gap-12 rounded-xl"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(24rem, 1fr))",
              gridTemplateRows: "min-content",
            }}>
            <Card
              url="/repo?username=rahuletto&repo=gitmystat"
              text="/repo?username=rahuletto&repo=gitmystat"
              width={300}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <h4 className="text-left text-3xl font-bold">Top Languages</h4>
          <div
            className="grid w-full gap-12 rounded-xl"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(24rem, 1fr))",
              gridTemplateRows: "min-content",
            }}
          >
            <Card
              url="/top?username=rahuletto"
              text="/top?username=rahuletto"
              width={300}
            />
            <Card
              url="/top?username=rahuletto&layout=bar"
              text="/top?username=rahuletto&layout=bar"
              width={300}
            />
            <Card
              url="/top?username=rahuletto&layout=compact"
              text="/top?username=rahuletto&layout=compact"
              width={300}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <h4 className="text-left text-3xl font-bold">Wakatime</h4>
          <div
            className="grid w-full gap-12 rounded-xl"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(24rem, 1fr))",
              gridTemplateRows: "min-content",
            }}
          >
            <Card
              url="/wakatime?username=rahuletto"
              text="/wakatime?username=rahuletto"
              width={300}
            />
            <Card
              url="/wakatime?username=rahuletto&layout=bar"
              text="/wakatime?username=rahuletto&layout=bar"
              width={300}
            />
            <Card
              url="/wakatime?username=rahuletto&layout=compact"
              text="/wakatime?username=rahuletto&layout=compact"
              width={300}
            />
          </div>
        </div>
      </section>
    </>
  );
}
