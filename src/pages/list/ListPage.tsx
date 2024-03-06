import { useCallback } from "react";
import { useFetchPosts } from "./hooks";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { RedditFullname } from "@/api/reddit";
import { z } from "zod";
import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/ui";
import { PostListItem } from "@/components/PostListItem";

const DEFAULT_SUBREDDIT = "javascript";

export const ListPageSeachParams = z.object({
  subreddit: z.string().catch(DEFAULT_SUBREDDIT),
  after: RedditFullname.nullish().catch(null),
  before: RedditFullname.nullish().catch(null),
});

export function ListPage() {
  const { subreddit, after, before } = useSearch({
    from: "/",
  });

  const navigate = useNavigate({
    from: "/",
  });

  const { data } = useFetchPosts({
    subreddit,
    after: after ?? undefined,
    before: before ?? undefined,
  });

  const nextPosts = useCallback(() => {
    return navigate({ search: { subreddit, after: data?.after } });
  }, [data, navigate, subreddit]);

  const previousPosts = useCallback(() => {
    return navigate({ search: { subreddit, before: data?.before } });
  }, [data, navigate, subreddit]);

  const nextDisabled = !data?.after;
  const previousDisabled = !data?.before;

  return (
    <div className="container max-w-2xl py-8">
      <PageHeading className="mb-8">r/{subreddit}</PageHeading>
      <ul className="flex flex-col gap-y-4">
        {data?.posts.map(({ data }, index) => {
          return (
            <li key={index}>
              <Link
                to="/post/$subreddit/$postId"
                params={{ subreddit, postId: data.id }}
                className="group"
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
