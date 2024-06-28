import { QLError } from "./Error";

export interface UserStats {
  commits: number;
  pullRequests: number;
  reviews: number;
  issues: number;
  stars: number;
  followers: number;
}

export interface RawUserData {
  data: {
    user: User;
  };
  errors?: QLError[]
}

interface ContributeCollection {
  totalCommitContributions: number;
  contributionCalendar: {
    totalContributions: number;
  };
  totalRepositoriesWithContributedCommits: number;
  totalPullRequestContributions: number;
  totalIssueContributions: number;
}

interface Repositories {
  nodes: {
    stargazers: {
      totalCount: number;
    };
  }[];
}

interface User {
  contributionsCollection: ContributeCollection;
  repositories: Repositories;
  followers: {
    totalCount: number;
  };
}
