import { Pen } from "@/components/Icons";
import { Button } from "@/components/ui";
import { cn } from "@/utils/cn";
import { useRef, useState } from "react";

type SubredditSelectorProps = {
  subreddit: string;
  onSelect: (subreddit: string) => void;
};

export function SubredditSelector({
  onSelect,
  subreddit,
}: SubredditSelectorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function toggleEditing() {
    const inputElement = inputRef.current;
    if (!inputElement) return;

    if (isEditing) {
      const value = inputElement.value.trim();
      if (value !== subreddit) {
        onSelect(value);
      } else {
        inputElement.value = subreddit;
      }
    } else {
      inputElement.disabled = false;
      inputElement.focus();
    }
    setIsEditing(!isEditing);
  }

  return (
    <div className="flex flex-row items-center">
      <span className="text-xl lg:text-2xl">r/</span>
      <div
        className={cn(
          "flex flex-nowrap gap-x-2 items-center flex-1",
          isEditing ? "bg-secondary" : ""
        )}
      >
        <input
          className="disabled:bg-transparent bg-transparent text-2xl lg:text-4xl font-bold flex-1"
          defaultValue={subreddit}
          placeholder="Subreddit..."
          ref={inputRef}
          disabled={!isEditing}
        />
        <Button
          variant={isEditing ? "default" : "ghost"}
          onClick={toggleEditing}
        >
          {isEditing && "Go"}
          {!isEditing && <Pen />}
        </Button>
      </div>
    </div>
  );
}
