import { useId } from "react";
import { cn } from "@/shared/lib/utils";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  title: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  semiBold?: boolean;
  error?: string;
}

export function SelectField(props: SelectFieldProps) {
  const {
    title,
    options,
    value,
    defaultValue,
    onValueChange,
    semiBold,
    error,
  } = props;

  const selectId = useId();

  return (
    <div className="max-w-[450px]">
      <Label
        className={cn(
          "block pt-4 pb-2 text-base font-normal",
          semiBold && "font-semibold",
        )}
        htmlFor={selectId}
      >
        {title}
      </Label>

      <Select
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        <SelectTrigger
          id={selectId}
          className={cn(
            "w-full",
            error && "border-destructive focus-visible:ring-destructive/20",
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${selectId}-error` : undefined}
        >
          <SelectValue placeholder={title} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <p
        id={`${selectId}-error`}
        className="mt-1 min-h-3 text-[12px] leading-3 text-destructive"
        role={error ? "alert" : undefined}
      >
        {error ?? ""}
      </p>
    </div>
  );
}
