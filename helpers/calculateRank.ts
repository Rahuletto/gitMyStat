import { RawUserData, UserStats } from "@/types/UserStats";

function calculatePercentiles(stats: UserStats): number {
  const { commits, pullRequests, reviews, issues, stars, followers } = stats;

  const commitPercentile = 1 - Math.exp(-commits / 100);
  const prPercentile = 1 - Math.exp(-pullRequests / 100);
  const reviewPercentile = 1 - Math.exp(-reviews / 100);
  const issuePercentile = 1 - Math.exp(-issues / 100);
  const starPercentile = (1 + erf(Math.log(stars) / Math.sqrt(2))) / 2;
  const followerPercentile = (1 + erf(Math.log(followers) / Math.sqrt(2))) / 2;

  const globalPercentile =
    (commitPercentile +
      prPercentile +
      reviewPercentile +
      issuePercentile +
      starPercentile +
      followerPercentile) /
    6;

  return globalPercentile * 100;
}

function mapPercentileToRank(percent: number): string {
  const percentile = 100 - percent;
  if (percentile <= 1) return "S";
  if (percentile <= 12.5) return "A+";
  if (percentile <= 25) return "A";
  if (percentile <= 37.5) return "A-";
  if (percentile <= 50) return "B+";
  if (percentile <= 62.5) return "B";
  if (percentile <= 75) return "B-";
  if (percentile <= 87.5) return "C+";
  if (percentile <= 91) return "C";
  return "D";
}

export function calculateRank(stats: UserStats): string {
  const percentile = calculatePercentiles(stats);
  console.log(percentile);
  const rank = mapPercentileToRank(percentile);
  return rank;
}

function erf(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t;
  return sign * (1.0 - y * Math.exp(-x * x));
}

export function parseGitHubData(data: RawUserData): UserStats {
  const userData = data.data.user;
  const contributions = userData.contributionsCollection;
  const repositories = userData.repositories.nodes;
  const followers = userData.followers.totalCount;

  const stars = repositories.reduce(
    (acc, repo) => acc + repo.stargazers.totalCount,
    0
  );

  const stats: UserStats = {
    commits: contributions.contributionCalendar.totalContributions,
    pullRequests: userData.pullRequests.totalCount,
    reviews: contributions.totalCommitContributions,
    issues: userData.issues.totalCount,
    stars,
    followers,
  };

  return stats;
}
