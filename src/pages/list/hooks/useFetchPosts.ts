import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DEFAULT_POST_LIMIT, fetchPosts, FetchPostsArgs } from "@/api/reddit";
import { useRef } from "react";

export function useFetchPosts({
  subreddit,
  after,
  before,
  limit = DEFAULT_POST_LIMIT,
}: Omit<FetchPostsArgs, "count">) {
  const client = useQueryClient();
  const totalCountRef = useRef(after || before ? limit : 0);

  const { isError, isLoading, data } = useQuery({
    queryKey: ["posts", subreddit, after, before, limit],
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

      data.posts.forEach((post) => {
        client.setQueryData(
          ["post", post.data.subreddit, post.data.id],
          post.data
        );
      });

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
