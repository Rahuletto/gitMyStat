import { animate } from "./animate";

export default function Send(image: string, delay: number = 0.4, bar?: boolean) {
  return new Response(animate(image, delay, bar), {
    headers: {
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "cache-control": "private, maxage=21600",
      "Content-Type": "image/svg+xml",
    },
  });
}
