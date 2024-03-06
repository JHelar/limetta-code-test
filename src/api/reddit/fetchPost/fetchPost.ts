import { z } from "zod";
import { fetchJSON } from "../../../client";
import { REDDIT_BASE_URL, TypePrefixes } from "../constants";
import { makeRedditListingOf } from "../helper";
import { Comment, Post } from "../types";

const PostList = makeRedditListingOf(Post);
type PostList = z.infer<typeof PostList>;

const CommentList = makeRedditListingOf(Comment);
type CommentList = z.infer<typeof CommentList>;

const FetchPostResponse = z.array(z.union([PostList, CommentList]));

type FetchPostArgs = {
  postId: string;
  subreddit: string;
};
export async function fetchPost(
  { postId, subreddit }: FetchPostArgs,
  signal?: AbortSignal
) {
  const params = new URLSearchParams({
    raw_json: "1",
  });
  const url = `${REDDIT_BASE_URL}/r/${subreddit}/comments/${postId}.json?${params.toString()}`;
  const jsonData = await fetchJSON(url, { signal });
  const data = await FetchPostResponse.parseAsync(jsonData);

  const post = data.find((list): list is PostList =>
    list.data.children.every((child) => child.kind === TypePrefixes.Link)
  );

  return post?.data.children.at(0)?.data;
}
