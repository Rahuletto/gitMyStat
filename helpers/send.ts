export default function Send(image: string) {
  return new Response(image, {
    headers: {
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "cache-control": "private, maxage=86400",
      "Content-Type": "image/svg+xml",
    },
  });
}
