import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useCallback } from "react";

type PostLimitSelectorProps = {
  className?: string;
  limit: number;
  limits: number[];
  onValueChange: (limit: number) => void;
};

export function PostLimitSelector({
  className,
  limits,
  limit,
  onValueChange,
}: PostLimitSelectorProps) {
  const onChange = useCallback(
    (valueStr: string) => {
      const value = Number(valueStr);
      onValueChange(value);
    },
    [onValueChange]
  );

  return (
    <div className={className}>
      <Select onValueChange={onChange} defaultValue={limit.toString()}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Post limit" />
        </SelectTrigger>
        <SelectContent>
          {limits.map((value, index) => (
            <SelectItem value={value.toString()} key={index}>
              Post limit: {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
