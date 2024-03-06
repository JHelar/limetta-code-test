import { useCallback } from "react";
import { useFetchPosts } from "./hooks";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  DEFAULT_POST_LIMIT,
  DEFAULT_SUBREDDIT,
  RedditFullname,
} from "@/api/reddit";
import { z } from "zod";
import { Button } from "@/components/ui";
import { PostListItem } from "@/components/PostListItem";
import { SubredditSelector } from "./components/SubredditSelector";
import { PostLimitSelector } from "./components/PostLimitSelector";

export const ListPageSeachParams = z.object({
  subreddit: z.string().catch(DEFAULT_SUBREDDIT),
  after: RedditFullname.nullish().catch(null),
  before: RedditFullname.nullish().catch(null),
  limit: z.number().catch(DEFAULT_POST_LIMIT),
});

export function ListPage() {
  const { subreddit, after, before, limit } = useSearch({
    from: "/",
  });

  const navigate = useNavigate({
    from: "/",
  });

  const { data } = useFetchPosts({
    subreddit,
    limit,
    after: after ?? undefined,
    before: before ?? undefined,
  });

  const nextPosts = useCallback(() => {
    navigate({ search: { subreddit, after: data?.after, limit } });
  }, [data?.after, limit, navigate, subreddit]);

  const previousPosts = useCallback(() => {
    navigate({ search: { subreddit, before: data?.before, limit } });
  }, [data?.before, limit, navigate, subreddit]);

  const selectSubreddit = useCallback(
    (subreddit: string) => {
      navigate({ search: { subreddit, limit } });
    },
    [limit, navigate]
  );

  const setPostLimit = useCallback(
    (limit: number) => {
      navigate({ search: { subreddit, limit, after, before } });
    },
    [after, before, navigate, subreddit]
  );

  const nextDisabled = !data?.after;
  const previousDisabled = !data?.before;

  return (
    <div className="container">
      <SubredditSelector subreddit={subreddit} onSelect={selectSubreddit} />
      <PostLimitSelector
        className="mt-4 mb-2"
        limits={[5, 10, 15]}
        limit={limit}
        onValueChange={setPostLimit}
      />
      {data && (
        <ul className="flex flex-col gap-y-4" data-testid="post-list">
          {data.posts.map(({ data }, index) => {
            return (
              <li key={index}>
                <Link
                  to="/post/$subreddit/$postId"
                  params={{ subreddit, postId: data.id }}
                  className="group"
                  data-testid="post-list-item"
                >
                  <PostListItem
                    thumbnailUrl={data.preview?.images.at(0)?.source.url}
                    author={data.author}
                    createdMs={data.created * 1000}
                    score={data.score}
                    title={data.title}
                    comments={data.num_comments}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <div className="flex flex-row gap-x-2 mt-8 justify-center">
        <Button onClick={previousPosts} disabled={previousDisabled}>
          Previous
        </Button>
        <Button onClick={nextPosts} disabled={nextDisabled}>
          Next
        </Button>
      </div>
    </div>
  );
}
