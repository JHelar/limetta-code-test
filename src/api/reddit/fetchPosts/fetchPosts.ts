import { REDDIT_BASE_URL } from "../constants";
import { Post, RedditFullname } from "../types";
import { fetchJSON } from "../../../client";
import { makeRedditListingOf } from "../helper";

export const DEFAULT_POST_LIMIT = 10;

const FetchPostsResponse = makeRedditListingOf(Post);

export type FetchPostsArgs = {
  subreddit: string;
  after?: RedditFullname;
  before?: RedditFullname;
  limit?: number;
  count?: number;
};

export async function fetchPosts(
  {
    subreddit,
    after = undefined,
    before = undefined,
    limit = DEFAULT_POST_LIMIT,
    count = undefined,
  }: FetchPostsArgs,
  signal?: AbortSignal
) {
  const params = new URLSearchParams({
    limit: limit.toString(),
    after: after ?? "",
    before: before ?? "",
    raw_json: "1",
    count: count?.toString() ?? "",
  });

  const url = `${REDDIT_BASE_URL}/r/${subreddit}.json?${params.toString()}`;

  const jsonData = await fetchJSON(url, { signal });
  const { data } = await FetchPostsResponse.parseAsync(jsonData);

  return {
    posts: data.children,
    before: data.before,
    after: data.after,
  };
}
