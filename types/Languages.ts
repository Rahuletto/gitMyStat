export interface Repository {
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
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
