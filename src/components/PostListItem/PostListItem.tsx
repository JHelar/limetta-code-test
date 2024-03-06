import { ScorePill } from "../ScorePill";
import { CommentPill } from "../CommentPill";
import { AuthorInfo } from "../AuthorInfo";

type PostListItemProps = {
  title: string;
  author: string;
  score: number;
  createdMs: number;
  comments: number;
  thumbnailUrl?: string;
};

export function PostListItem({
  title,
  author,
  score,
  comments,
  createdMs,
  thumbnailUrl,
}: PostListItemProps) {
  return (
    <div className="p-4 rounded-md flex flex-col gap-y-4 bg-secondary group-hover:bg-secondary/30 group-focus-visible:bg-secondary/30 transition-colors">
      <AuthorInfo author={author} createdMs={createdMs} />
      <div>
        <h2 className="text-lg font-bold">{title}</h2>
        {thumbnailUrl && (
          <img
            className="block mt-2 max-h-96 w-full object-contain object-center rounded-md bg-secondary-foreground"
            src={thumbnailUrl}
            aria-hidden
          />
        )}
      </div>
      <div className="flex flex-row flex-nowrap gap-x-4">
        <ScorePill score={score} />
        <CommentPill comments={comments} />
      </div>
    </div>
  );
}
