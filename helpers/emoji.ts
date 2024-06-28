/**
 * modified version of https://unpkg.com/twemoji@13.1.0/dist/twemoji.esm.js.
 */

/* ! Copyright Twitter Inc. and other contributors. Licensed under MIT */

const U200D = String.fromCharCode(8205);
const UFE0Fg = /\uFE0F/g;

export function getIconCode(char: string) {
  return toCodePoint(!char.includes(U200D) ? char.replace(UFE0Fg, "") : char);
}

function toCodePoint(unicodeSurrogates: string) {
  const r = [];
  let c = 0;
  let i = 0;
  let p = 0;

  while (i < unicodeSurrogates.length) {
    c = unicodeSurrogates.charCodeAt(i++);
    if (p) {
      r.push((65536 + ((p - 55296) << 10) + (c - 56320)).toString(16));
      p = 0;
    } else if (55296 <= c && c <= 56319) {
      p = c;
    } else {
      r.push(c.toString(16));
    }
  }
  return r.join("-");
}

const emojiCache: Record<string, Promise<string>> = {};

export async function loadEmoji(code: string) {
  const key = `${code}`;

  if (key in emojiCache) {
    return emojiCache[key];
  }

  const api = "https://cdn.jsdelivr.net/gh/svgmoji/svgmoji/packages/svgmoji__noto/svg/";

  return (emojiCache[key] = fetch(`${api}${code.toUpperCase()}.svg`).then(
    async (r) => r.text()
  ));
}
