import { cn } from "@/utils/cn";
import ReactMarkdown from "react-markdown";

type MarkdownProps = {
  className?: string;
  children?: string | null;
};
export function Markdown({ children, className }: MarkdownProps) {
  return (
    <div className={cn("flex flex-col gap-y-1 text-sm", className)}>
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}
