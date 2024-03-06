import { cn } from "@/utils/cn";
import { ArrowDown, ArrowUp } from "../Icons";

type ScorePillProps = {
  score: number;
  className?: string;
};

export function ScorePill({ score, className }: ScorePillProps) {
  return (
    <div
      className={cn(
        "flex flex-row flex-nowrap items-center text-sm px-1 rounded-md bg-secondary text-secondary-foreground",
        className
      )}
    >
      <ArrowUp />
      {score}
      <ArrowDown />
    </div>
  );
}
