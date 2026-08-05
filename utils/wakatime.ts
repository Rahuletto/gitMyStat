import { RawWakaData } from "@/types/Waka";

export default async function Wakatime(user: string) {
  try {
    const url = `https://api.wakatime.com/api/v1/users/${encodeURIComponent(user)}/stats?is_including_today=true&range=all_time`;

    const response = await fetch(url, {
      method: "GET"
    });

    if (!response.ok) {
      return { error: `WakaTime API HTTP ${response.status}` };
    }

    const data: RawWakaData = await response.json();
    return data;
  } catch (err: any) {
    return { error: err.message || "Failed to fetch WakaTime stats" };
  }
}
