import { Options } from "@/types/AnimateOptions";
import { animate } from "./animate";


export default function Send(image: string, options?: Options) {
  return new Response(animate(image, options), {
    headers: {
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "cache-control": "private, max-age=43200, stale-if-error=3600, stale-while-revalidate=21600",
      "Content-Type": "image/svg+xml",
    },
  });
}
