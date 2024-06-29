/* eslint-disable @next/next/no-img-element */
import { Themes } from "@/themes";
import { ThemeType } from "@/types/Theme";
import { useEffect, useRef, useState } from "react";
import { HexColorInput, HexAlphaColorPicker } from "react-colorful";

export default function Builder() {
  const userInput = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState("");
  const [theme, setTheme] = useState("");
  const [layout, setLayout] = useState("default");
  const [username, setUsername] = useState("");
  const [repo, setRepo] = useState("");
  const [card, setCard] = useState("");
  const [themeColors, setThemeColors] = useState(Themes["dark"]);
  const [error, setError] = useState(0);

  const handleColorChange = (key: keyof typeof themeColors, value: string) => {
    setThemeColors((prevThemeColors) => ({
      ...prevThemeColors,
      [key]: value,
    }));
  };

  const renderColorPickers = () => {
    if (themeColors)
      return Object.keys(themeColors).map((key) =>
        key == "radius" || key == "padding" ? (
          <div
            key={key}
            className="flex flex-col items-start justify-start gap-2"
          >
            <label>{key}</label>
            <input
              type="number"
              value={themeColors[key]}
              onChange={(e) =>
                handleColorChange(
                  key as keyof typeof themeColors,
                  e.target.value
                )
              }
              className="max-w-[120px] appearance-none rounded-xl border-paper-border px-4 py-2 text-lg text-paper-color dark:bg-moonlight-background dark:text-moonlight-accent"
            />
          </div>
        ) : (
          <div
            key={key}
            className="flex flex-col items-start justify-start gap-2"
          >
            <label>{key}</label>
            <div className="flex flex-col">
              <HexAlphaColorPicker
                color={(themeColors as any)[key]}
                onChange={(e) => {
                  handleColorChange(key as keyof typeof themeColors, e);
                }}
              />
              <HexColorInput
                className="max-w-[200px] appearance-none rounded-xl border-paper-border px-4 py-2 text-lg text-paper-color dark:bg-moonlight-background dark:text-moonlight-accent"
                color={(themeColors as any)[key]}
                onChange={(e) => {
                  handleColorChange(key as keyof typeof themeColors, e);
                }}
              />
            </div>
          </div>
        )
      );
  };

  useEffect(() => {
    if (theme) {
      setThemeColors(Themes[theme]);
    }
  }, [theme]);

  useEffect(() => {
    setUrl("");
  }, [card]);

  function generate() {
    setError(0);
    if (username) {
      setUrl(
        generateURL({
          card,
          theme,
          username,
          repo,
          layout: card == "top" || card == "wakatime" ? layout : "",
          custom: themeColors as any,
        })
      );
    } else {
      userInput.current?.focus();
      setError(1);
    }
  }

  const btnStyle =
    "active:scale-90 hover:scale-105 rounded-full lg:py-4 lg:px-12 py-2 px-2 lg:text-xl text-lg lg:font-semibold font-medium hover:dark:bg-moonlight-background hover:dark:text-moonlight-color hover:bg-paper-accent hover:text-paper-color";
  return (
    <section
      data-theme="default"
      id="builder"
      className="bg-gray-background border-gray-border flex min-h-screen w-full flex-col items-start justify-start gap-6 border-t-2 border-solid px-12 py-16 lg:px-48 dark:border-moonlight-border dark:bg-moonlight-background"
    >
      <div>
        <h2 className="text-left text-5xl font-bold">Builder</h2>
        <p className="text-lg">Build your card without messing with the url</p>
      </div>

      <div className="flex flex-row flex-wrap items-center gap-4 rounded-3xl bg-paper-accent p-2 lg:justify-center lg:rounded-full dark:bg-moonlight-border">
        <button
          className={`${btnStyle} ${card === "user" && "bg-paper-border text-paper-color dark:bg-moonlight-color dark:text-moonlight-background"}`}
          onClick={() => setCard("user")}
        >
          User
        </button>
        <button
          className={`${btnStyle} ${card === "recent" && "bg-paper-border text-paper-color dark:bg-moonlight-color dark:text-moonlight-background"}`}
          onClick={() => setCard("recent")}
        >
          Recent
        </button>
        <button
          className={`${btnStyle} ${card === "repo" && "bg-paper-border text-paper-color dark:bg-moonlight-color dark:text-moonlight-background"}`}
          onClick={() => setCard("repo")}
        >
          Repo
        </button>
        <button
          className={`${btnStyle} ${card === "top" && "bg-paper-border text-paper-color dark:bg-moonlight-color dark:text-moonlight-background"}`}
          onClick={() => setCard("top")}
        >
          Top Languages
        </button>
        <button
          className={`${btnStyle} ${card === "wakatime" && "bg-paper-border text-paper-color dark:bg-moonlight-color dark:text-moonlight-background"}`}
          onClick={() => setCard("wakatime")}
        >
          Wakatime
        </button>
      </div>

      {card ? (
        <div
          className={`${error == 1 ? "border-4 border-red-400" : ""} flex min-h-[70vh] w-full flex-col items-start justify-between gap-8 rounded-3xl px-12 py-6 dark:bg-moonlight-border`}
        >
          <div className="flex w-full flex-col items-start justify-start gap-8">
            <h2 className="text-left text-4xl font-bold">
              {card.charAt(0).toUpperCase() + card.slice(1)}
            </h2>
            <details open>
              <summary>Parameters</summary>
              <div className="mt-4 flex flex-wrap gap-4 lg:gap-12">
                <div className="flex flex-col items-start justify-start gap-2">
                  <label>theme</label>
                  <select
                    required
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="appearance-none rounded-xl border-paper-border px-4 py-2 text-lg text-paper-color dark:bg-moonlight-background dark:text-moonlight-accent"
                  >
                    <option disabled value="" selected>
                      Select Theme
                    </option>
                    {Object.keys(Themes).map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col items-start justify-start gap-2">
                  <label>username</label>
                  <input
                    ref={userInput}
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`${error == 1 ? "border-4 border-red-400" : ""} appearance-none rounded-xl border-paper-border px-4 py-2 text-lg text-paper-color dark:bg-moonlight-background dark:text-moonlight-accent`}
                  />
                </div>
                {card == "top" ||
                  (card == "wakatime" && (
                    <div className="flex flex-col items-start justify-start gap-2">
                      <label>layout</label>
                      <select
                        required
                        value={layout}
                        onChange={(e) => setLayout(e.target.value)}
                        className="appearance-none rounded-xl border-paper-border px-4 py-2 text-lg text-paper-color dark:bg-moonlight-background dark:text-moonlight-accent"
                      >
                        <option disabled value="" selected>
                          Select Layout
                        </option>
                        <option value="bar">bar</option>
                        <option value="compact">compact</option>
                        <option value="default" selected>
                          default
                        </option>
                      </select>
                    </div>
                  ))}

                {card === "repo" && (
                  <div className="flex flex-col items-start justify-start gap-2">
                    <label>repo</label>
                    <input
                      required
                      value={repo}
                      onChange={(e) => setRepo(e.target.value)}
                      className="appearance-none rounded-xl border-paper-border px-4 py-2 text-lg text-paper-color dark:bg-moonlight-background dark:text-moonlight-accent"
                    />
                  </div>
                )}
              </div>
            </details>

            <details>
              <summary>Customization</summary>
              <div className="mt-4 flex flex-wrap gap-4 lg:gap-12">
                {renderColorPickers()}
              </div>
            </details>

            <button
              className="rounded-xl bg-paper-color px-4 py-2 text-lg font-semibold text-paper-tip dark:bg-moonlight-color dark:text-moonlight-background"
              onClick={() => generate()}
            >
              Generate
            </button>
          </div>

          {url && (
            <div className="flex w-full flex-col items-start justify-center gap-4">
              <img src={url} alt={card} />
              <code className="mx-4 select-all break-all rounded-xl border-paper-border px-4 py-2 text-sm text-paper-color lg:text-lg dark:bg-moonlight-background dark:text-moonlight-accent">
                https://gitmystat.vercel.app{url}
              </code>
            </div>
          )}
        </div>
      ) : (
        <h1 className="mt-24 w-full text-left text-6xl font-bold text-paper-color dark:text-moonlight-color">
          Select a type
        </h1>
      )}
    </section>
  );
}

function generateURL({
  card,
  theme,
  username,
  repo,
  layout,
  custom,
}: {
  card: string;
  theme: string;
  username: string;
  repo?: string;
  layout?: string;
  custom: ThemeType;
}) {
  const params = new URLSearchParams();

  params.append("theme", theme);
  params.append("username", username);

  if (card === "repo" && repo) {
    params.append("repo", repo);
  }

  if (layout) {
    params.append("layout", layout);
  }

  const defaultTheme = Themes[theme || "dark"];

  Object.keys(defaultTheme).forEach((key) => {
    if (custom[key] !== (defaultTheme as any)[key]) {
      params.append(key, (custom as any)[key]);
    }
  });

  return `/${card}?${params.toString().replaceAll("%23", "0x").replaceAll("#", "0x")}`;
}
