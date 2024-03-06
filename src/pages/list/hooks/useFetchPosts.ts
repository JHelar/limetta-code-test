import { useQuery } from "@tanstack/react-query";
import {
  DEFAULT_POST_LIMIT,
  fetchPosts,
  FetchPostsArgs,
  Post,
} from "../../../api/reddit";
import { useRef } from "react";
import { getClient } from "@/client";

function cachePost(post: Post) {
  const client = getClient();
  client.setQueryData(["post", post.subreddit, post.id], () => post);
}

export function useFetchPosts({
  subreddit,
  after,
  before,
  limit,
}: Omit<FetchPostsArgs, "count">) {
  const totalCountRef = useRef(after || before ? DEFAULT_POST_LIMIT : 0);

  const { isError, isLoading, data } = useQuery({
    queryKey: ["posts", subreddit, after, before],
    async queryFn({ signal }) {
      const data = await fetchPosts(
        {
          subreddit,
          after,
          before,
          limit,
          count: totalCountRef.current,
        },
        signal
      );

      data.posts.forEach((post) => cachePost(post.data));

      totalCountRef.current += data.posts.length;

      return data;
    },
  });

  return {
    isError,
    isLoading,
    data,
  };
}
