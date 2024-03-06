import { Skeleton } from "../ui/skeleton";
import { ScorePill } from "../ScorePill";
import { Markdown } from "../Markdown";
import { AuthorInfo } from "../AuthorInfo";

export function CommentItemSkeleton() {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex row items-center gap-x-2 h-[20px]">
        <Skeleton className="w-[80px] h-full" />
        <Skeleton className="w-[40px] h-full" />
      </div>
      <Skeleton className="w-full h-[100px]" />
    </div>
  );
}

type CommentItemProps = {
  author: string;
  createdMs: number;
  body: string;
  score: number;
};
export function CommentItem({
  author,
  body,
  createdMs,
  score,
}: CommentItemProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <AuthorInfo author={author} createdMs={createdMs} />
      <Markdown>{body}</Markdown>
      <div className="flex flex-row flex-nowrap gap-x-4">
        <ScorePill score={score} />
      </div>
    </div>
  );
}
