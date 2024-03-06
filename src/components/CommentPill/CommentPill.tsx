import { cn } from "@/utils/cn";
import { Annotation } from "../Icons";

type CommentPillProps = {
  comments: number;
  className?: string;
};
export function CommentPill({ comments, className }: CommentPillProps) {
  return (
    <div
      className={cn(
        "flex items-center text-sm px-1 rounded-md bg-secondary text-secondary-foreground",
        className
      )}
    >
      <Annotation className="mr-1" />
      {comments}
    </div>
  );
}
