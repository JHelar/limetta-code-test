import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { fetchPost, fetchPostComments } from "@/api/reddit";
import { PageHeading } from "@/components/PageHeading";
import { Suspense } from "react";
import { CommentItem, CommentItemSkeleton } from "@/components/CommentItem";
import { ScorePill } from "@/components/ScorePill";
import { CommentPill } from "@/components/CommentPill";
import { Markdown } from "@/components/Markdown";
import { AuthorInfo } from "@/components/AuthorInfo";
import { TypePrefixes } from "@/api/reddit/constants";

type PostPageCommentsProps = {
  subreddit: string;
  postId: string;
};
function PostPageComments({ postId, subreddit }: PostPageCommentsProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["comments", subreddit, postId],
    queryFn({ signal }) {
      return fetchPostComments({ subreddit, postId }, signal);
    },
  });

  // For now filter out only comment children, there can be "more" children
  const comments = data.children.filter(
    (comment) => comment.kind === TypePrefixes.Comment
  );

  return (
    <ul className="flex flex-col gap-y-6">
      {comments.map((comment, index) => (
        <li key={index}>
          <CommentItem
            score={comment.data.score}
            author={comment.data.author}
            body={comment.data.body}
            createdMs={comment.data.created * 1000}
          />
        </li>
      ))}
    </ul>
  );
}

function PostPageCommentsSkeleton() {
  return (
    <ul className="flex flex-col gap-y-6">
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <li key={index}>
            <CommentItemSkeleton />
          </li>
        ))}
    </ul>
  );
}

export function PostPage() {
  const { subreddit, postId } = useParams({
    from: "/post/$subreddit/$postId",
  });

  const { data: post } = useQuery({
    queryKey: ["post", subreddit, postId],
    queryFn({ signal }) {
      return fetchPost({ subreddit, postId }, signal);
    },
  });

  if (!post) {
    return null;
  }

  const thumbnailUrl = post.preview?.images.at(0)?.source.url;

  return (
    <div className="container max-w-2xl py-8 flex flex-col gap-y-4">
      <AuthorInfo author={post.author} createdMs={post.created * 1000} />
      <PageHeading className="text-left">{post.title}</PageHeading>

      {thumbnailUrl && <img src={thumbnailUrl} className="rounded-md" />}

      {post.selftext && <Markdown>{post.selftext}</Markdown>}

      <div className="flex flex-row flex-nowrap gap-x-4 pb-8 mb-4 border-b-2">
        <ScorePill score={post.score} />
        <CommentPill comments={post.num_comments} />
      </div>

      <Suspense fallback={<PostPageCommentsSkeleton />}>
        <PostPageComments postId={postId} subreddit={subreddit} />
      </Suspense>
    </div>
  );
}
