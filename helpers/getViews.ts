export async function getViews(username: string): Promise<number> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(
      `https://komarev.com/ghpvc/?username=${username.toLowerCase()}`,
      {
        signal: controller.signal,
        headers: {
          "User-Agent": "gitMyStat-Visitor-Counter/1.0",
        },
      }
    );
    clearTimeout(timeoutId);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    const svgText = await res.text();
    const textMatches = svgText.match(/<text[^>]*>([^<]+)<\/text>/g);
    if (textMatches && textMatches.length >= 2) {
      const countText = textMatches[textMatches.length - 1]
        .replace(/<[^>]*>/g, "")
        .trim();
      const count = parseInt(countText.replace(/,/g, ""), 10);
      if (!isNaN(count)) {
        return count;
      }
    }
  } catch (e) {
    console.error("Error fetching views from GHPVC:", e);
  } finally {
    clearTimeout(timeoutId);
  }
  return 0;
}
