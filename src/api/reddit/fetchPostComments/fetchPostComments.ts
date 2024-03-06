import { z } from "zod";
import { fetchJSON } from "../../../client";
import { REDDIT_BASE_URL, TypePrefixes } from "../constants";
import { makeRedditListingOf } from "../helper";
import { Comment } from "../types";

const CommentList = makeRedditListingOf(Comment);
type CommentList = z.infer<typeof CommentList>;

const FetchPostResponse = z.array(
  z.union([makeRedditListingOf(z.any()), CommentList])
);

type FetchPostCommentsArgs = {
  postId: string;
  subreddit: string;
};
export async function fetchPostComments(
  { postId, subreddit }: FetchPostCommentsArgs,
  signal?: AbortSignal
) {
  const params = new URLSearchParams({
    raw_json: "1",
  });
  const url = `${REDDIT_BASE_URL}/r/${subreddit}/comments/${postId}.json?${params.toString()}`;
  const jsonData = await fetchJSON(url, { signal });
  const data = await FetchPostResponse.parseAsync(jsonData);

  const commentsList = data.find(
    (list): list is CommentList =>
      list.data.children.at(0)?.kind !== TypePrefixes.Link
  );

  const comments = commentsList?.data;
  if (comments === undefined) {
    throw new Error(
      `[ERROR] fetchPostComments no comments in response: ${url}`
    );
  }

  return comments;
}
