import { Options } from "@/types/AnimateOptions";

export function animate(svgString: string, options?: Options): string {
  if (options?.error) return svgString;

  const pathRegex = /<path[^>]*\bd="([^"]*)"/gi;
  let match;
  let index = 0;
  while ((match = pathRegex.exec(svgString)) !== null) {
    if (match[1].length > 150) {
      svgString = svgString.replace(
        match[0],
        `${match[0]} class="long-path" style="animation: fadein 0.5s ${index * (options?.delay || 0.4) + 0.2}s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards; opacity: 0;"`
      );
      index++;
    }
  }

  if (options?.bar) {
    const clip = /<rect[^>]*\bclip-path="([^"]*)"/gi;
    match = "";
    index = 0;
    while ((match = clip.exec(svgString)) !== null) {
      if (match[1].includes("cp-id-1")) {
        svgString = svgString.replace(
          match[0],
          `${match[0]} class="barchart" style="animation: fadein 0.7s ${index * (options?.delay || 0.4) + 0.1}s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards; opacity: 0;"`
        );
        index++;
      }
    }
  }
  const style = `
      <style>
      @keyframes slide {
        from {
            transform: scaleX(0);
        } to {
         transform: scaleX(1);
         }
      }
        @keyframes fadein {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
          image {
            opacity: 0;
            animation: fadein 0.5s 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
          }
            .barchart, .long-path, image {
            transition: 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
            }
      </style>
    `;
  const splitter = svgString.split('/svg">');
  return splitter[0] + '/svg">' + style + splitter[1];
}
