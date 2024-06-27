import { QLError } from "./Error";

export interface Repository {
  name: string;
  languages: {
    totalSize: number;
    edges: {size: number; node: { name: string; color: string }}[] | null;
  };
}

export interface RawLanguageData {
  data: {
    user: {
      repositories: {
        edges: Array<{ node: Repository }>;
      };
    };
  };
  errors?: QLError[];
}

export interface LanguageStat {
  name: string;
  color: string;
  count: number;
  percent: number;
}
