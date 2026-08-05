import { Options } from "@/types/AnimateOptions";
import { animate } from "./animate";


export default function Send(image: string, options?: Options) {
  const cacheControl = options?.error
    ? "no-cache, no-store, must-revalidate, max-age=0"
    : "private, max-age=43200, stale-if-error=3600, stale-while-revalidate=21600";

  return new Response(animate(image, options), {
    headers: {
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Cache-Control": cacheControl,
      "Content-Type": "image/svg+xml",
    },
  });
}
