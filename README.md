![gitmystat](/assets/gitmystat.png)

# gitMyStat!

~~Get~~ git your stats to use it in your `README`

> Inspired by a great project [github-readme-stats](https://github.com/anuraghazra/github-readme-stats/)

## Table of Contents

- [Parameters](#parameters)

- Cards

  - [User](#user)
  - [Recent repos](#recent-repo)
  - [Repo card](#repo-card)
  - [Top languages](#top-languages)
  - [Wakatime](#wakatime)

- [Themes](#themes)

---

## Parameters

All cards are built equally. Which means these apply to every card possible

| Parameters | Description                       | Default |
| ---------- | --------------------------------- | ------- |
| `username` | The username to get the data from |         |
| `theme`    | The theme to apply on the cards   | dark    |

### Customizations

> [!IMPORTANT]
> As url encoding messes up the <kbd>#</kbd> tag character, we wanted you to provide a hexadecimal code instead.
>
> ### `What's that?!`
>
> Nothing actually. instead of `#` we use `0x`.
>
> For example
>
> `#000000` is the same as `0x000000` > `#075fff` is the same as `0x075fff`

| Parameters   | Description                                        |
| ------------ | -------------------------------------------------- |
| `color`      | The hexadecimal color of the text color            |
| `accent`     | The hexadecimal color of the accent color          |
| `background` | The hexadecimal color of the background            |
| `border`     | The hexadecimal color of the border                |
| `tip`        | The hexadecimal color of the tertiary (tips) color |
| `radius`     | The radius of the border                           |
| `padding`    | The padding of the border                          |

- Totally decked out example

```
![image](https://gitmystat.vercel.app/recent?username=rahuletto&color=0xaeaeae&accent=0x075fff&background=0x000000&border=0x075fff&tip=0x075fff&radius=12&padding=24)
```

![image](https://gitmystat.vercel.app/recent?username=rahuletto&color=0xaeaeae&accent=0x075fff&background=0x000000&border=0x075fff&tip=0x075fff&radius=12&padding=24)

> [!TIP]
>
> Adding `theme={theme}` in the url would change the theme of any card
>
> For example
>
> - `https://gitmystat.vercel.app/recent?username=rahuletto&theme=gold`
>
> ![recent theme](https://gitmystat.vercel.app/recent?username=rahuletto&theme=gold)

---

## Cards
- [User](#user)
- [Recent repos](#recent-repo)
- [Repo card](#repo-card)
- [Top languages](#top-languages)
- [Wakatime](#wakatime)

### User stats
> This can't be that accurate as this is 'per-year' data calculation

- `https://gitmystat.vercel.app/user?username=rahuletto`

  ![user card](https://gitmystat.vercel.app/user?username=rahuletto)


### Recent repo

- `https://gitmystat.vercel.app/recent?username=rahuletto`

  ![recent](https://gitmystat.vercel.app/recent?username=rahuletto)

### Repo card

- `https://gitmystat.vercel.app/repo?username=rahuletto&repo=gitmystat`

  ![repo](https://gitmystat.vercel.app/repo?username=rahuletto&repo=gitmystat)

### Top languages

This is similar to [Wakatime](#wakatime) top languages card. but this uses your github repositories.

- `https://gitmystat.vercel.app/top?username=rahuletto`

  ![top](https://gitmystat.vercel.app/top?username=rahuletto)

There are other layouts to choose from:

- Compact
  > `https://gitmystat.vercel.app/top?username=rahuletto&layout=compact`

![top](https://gitmystat.vercel.app/top?username=rahuletto&layout=compact)

- Normal (Default)
  > `https://gitmystat.vercel.app/top?username=rahuletto&layout=normal`

![top](https://gitmystat.vercel.app/top?username=rahuletto)

- Bar
  > `https://gitmystat.vercel.app/top?username=rahuletto&layout=bar`

![top](https://gitmystat.vercel.app/top?username=rahuletto&layout=bar)

### Wakatime

This is similar to [Top Languages](#top-languages) github card. but this uses your Wakatime stats.

> [!WARNING]
> We are using WakaTime api, which only displays for profiles that are public. Make sure the `Display code time publicly` and `Display languages, editors, os, categories publicly` are enabled.

- `https://gitmystat.vercel.app/wakatime?username=rahuletto`

  ![waka](https://gitmystat.vercel.app/wakatime?username=rahuletto)

There are other layouts to choose from:

- Compact
  > `https://gitmystat.vercel.app/wakatime?username=rahuletto&layout=compact`

![waka](https://gitmystat.vercel.app/wakatime?username=rahuletto&layout=compact)

- Normal (Default)
  > `https://gitmystat.vercel.app/wakatime?username=rahuletto&layout=normal`

![waka](https://gitmystat.vercel.app/wakatime?username=rahuletto)

- Bar
  > `https://gitmystat.vercel.app/wakatime?username=rahuletto&layout=bar`

![waka](https://gitmystat.vercel.app/wakatime?username=rahuletto&layout=bar&theme=dark)

---

## Themes

There are currently 4 themes as of now.

| Themes         | Preview                                                                                         |
| -------------- | ----------------------------------------------------------------------------------------------- |
| Dark (default) | ![default](https://gitmystat.vercel.app/repo?username=rahuletto&repo=gitmystat)                 |
| Light          | ![default](https://gitmystat.vercel.app/repo?username=rahuletto&repo=gitmystat&theme=light)     |
| Gold           | ![default](https://gitmystat.vercel.app/repo?username=rahuletto&repo=gitmystat&theme=gold)      |
| Light gold     | ![default](https://gitmystat.vercel.app/repo?username=rahuletto&repo=gitmystat&theme=lightgold) |

> #### You like a theme, but you just don't like that particular color?
>
> It's alright! the parameters can override particular colors of the theme while keeping the other colors the same from the theme.

### Extend it.

These themes are not hard coded. You can add your own!
You have a great color palette? **PLEASE** do a pull request on our repo and make it a reality.

> [!NOTE]
> If you are making a theme, please make a light mode version of it too. This is not mandatory to do, but it's a good thing to have more flavors.

#### `How?`

- Go to `/themes/index.ts`

```ts
themename: {
    color: '#hex',
    accent: '#hex',
    background: '#hex',
    border: '#hex',
    tip: '#hex',
    radius: 24,
    padding: 24,
  },
```

- Change the `themename` to the name you prefer
- Change the color hex codes of the things, localhost would be great to test it
- Push it, Do a pull request.

It's that simple.
