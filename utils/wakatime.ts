import { RawWakaData } from "@/types/Waka";

export default async function Wakatime(user: string) {
  const url = `https://api.wakatime.com/api/v1/users/${encodeURIComponent(user)}/stats?is_including_today=true&range=all_time`;

  const response = await fetch(url, {
    method: "GET"
  });

  const data: RawWakaData = await response.json();
  return data;
}
