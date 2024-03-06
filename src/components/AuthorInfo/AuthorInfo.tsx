import { cn } from "@/utils/cn";
import { formatRelativeTime } from "@/utils/formatRelativeTime";

type AuthorInfoProps = {
  author: string;
  createdMs: number;
  className?: string;
};

export function AuthorInfo({ author, createdMs, className }: AuthorInfoProps) {
  const authorName = `u/${author}`;
  const createdStr = formatRelativeTime(createdMs);

  return (
    <div className={cn("flex flex-row", className)}>
      <div className="flex row items-center gap-x-2">
        <span className="text-sm font-bold">{authorName}</span>
        <span className="text-xs">{createdStr}</span>
      </div>
    </div>
  );
}
