import { QLError } from "./Error";

export interface RawRepoData {
  data: {
    repositoryOwner: {
      repository: Repo;
    };
  };
  errors?: QLError[];
}

export interface Repo {
  name: string;
  description: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  };
}
