import { X } from "lucide-react";
import { type ChangeEventHandler, useId } from "react";
import { cn } from "@/shared/lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";

interface InputFieldProps {
  title: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClear?: () => void;
  semiBold?: boolean;
  typeNumber?: boolean;
  error?: string;
}

export function InputField(props: InputFieldProps) {
  const { title, value, onChange, semiBold, typeNumber, error, onClear } =
    props;
  const inputId = useId();

  return (
    <>
      <Label
        className={cn(
          "text-base font-normal pt-4 pb-2",
          semiBold && "font-semibold",
        )}
        htmlFor={inputId}
      >
        {title}
      </Label>

      <div className="max-w-[450px]">
        <div className="relative">
          <Input
            className={cn(
              "pr-10",
              typeNumber &&
                `[appearance:textfield]
                [&::-webkit-inner-spin-button]:appearance-none
                [&::-webkit-outer-spin-button]:appearance-none`,
              error && "border-destructive focus-visible:ring-destructive/20",
            )}
            id={inputId}
            placeholder={title}
            type={typeNumber ? "number" : "text"}
            value={value}
            onChange={onChange}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 size-8 -mt-4"
            aria-label="Очистить"
            onClick={onClear}
          >
            <X />
          </Button>
        </div>
        <p
          id={`${inputId}-error`}
          className="mt-1 min-h-3 text-[12px] leading-3 text-destructive"
          role={error ? "alert" : undefined}
        >
          {error ?? ""}
        </p>
      </div>
    </>
  );
}
