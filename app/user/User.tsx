import { ThemeData } from "@/types/Theme";

import { UserStats } from "@/types/UserStats";
import Container from "../Container";
import { calculateRank } from "@/helpers/calculateRank";
import { GoCommit, GoGitPullRequest, GoIssueOpened, GoStar } from "react-icons/go";
import { formatNumber } from "@/helpers/formatNum";

export default function UserComp(data: UserStats, theme: ThemeData) {
  return (
    <Container theme={theme}>
      <div tw="flex align-center flex-col justify-center w-full">
        <div tw="flex flex-col items-center w-full" style={{ gap: 4 }}>
          <div tw={`flex -mb-2 text-[${theme.color}] font-bold text-[74px]`}>
            {calculateRank(data)}
          </div>
          <div tw={`flex text-[${theme.accent}] text-lg font-medium`}>
            @{theme.user}
          </div>
        </div>
        <div tw="flex flex-col mt-6 items-center w-full" style={{ gap: 10 }}>
          <div tw="flex justify-between w-full">
            <div tw="flex items-center" style={{ gap: 8 }}>
              <GoStar color={theme.tip} size={20} />
              <div tw={`flex text-[${theme.color}] text-xl font-bold`}>
                Stars
              </div>
            </div>
            <div tw={`flex text-[${theme.accent}] text-lg font-medium`}>
              {formatNumber(data.stars)}
            </div>
          </div>

          <div tw="flex justify-between w-full">
            <div tw="flex items-center" style={{ gap: 8 }}>
              <GoIssueOpened color={theme.tip} size={20} />
              <div tw={`flex text-[${theme.color}] text-xl font-bold`}>
                Issues
              </div>
            </div>
            <div tw={`flex text-[${theme.accent}] text-lg font-medium`}>
              {formatNumber(data.issues)}
            </div>
          </div>

          <div tw="flex justify-between w-full">
            <div tw="flex items-center" style={{ gap: 8 }}>
              <GoCommit color={theme.tip} size={20} />
              <div tw={`flex text-[${theme.color}] text-xl font-bold`}>
                Commits
              </div>
            </div>
            <div tw={`flex text-[${theme.accent}] text-lg font-medium`}>
              {formatNumber(data.commits)}
            </div>
          </div>

          <div tw="flex justify-between w-full">
            <div tw="flex items-center" style={{ gap: 8 }}>
              <GoGitPullRequest color={theme.tip} size={20} />
              <div tw={`flex text-[${theme.color}] text-xl font-bold`}>
                Pull Requests
              </div>
            </div>
            <div tw={`flex text-[${theme.accent}] text-lg font-medium`}>
              {formatNumber(data.pullRequests)}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
