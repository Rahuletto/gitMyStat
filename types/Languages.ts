export interface Repository {
  name: string;
  languages: {
    totalSize: number;
    edges: {size: number; node: { name: string; color: string }}[] | null;
  };
}

export interface LanguageData {
  data: {
    user: {
      repositories: {
        edges: Array<{ node: Repository }>;
      };
    };
  };
}

export interface LanguageStat {
  name: string;
  color: string;
  count: number;
  percent: number;
}
