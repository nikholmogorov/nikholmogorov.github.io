import type { InputBaseComponentProps } from "@mui/material/InputBase";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

interface CustomProps {
  onChange: (event: {
    target: {
      name?: string;
      value: string;
    };
  }) => void;
  name?: string;
}

const MaskedInput = forwardRef<HTMLInputElement, CustomProps>(
  function MaskedInput(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        inputRef={ref}
        mask={[
          {
            mask: "+7 (000)",
            lazy: false,
            placeholderChar: "\u00A0\u00A0",
          },
          {
            mask: "+7 (000) 000",
            placeholderChar: "\u00A0",
          },
          {
            mask: "+7 (000) 000-00",
            placeholderChar: "\u00A0",
          },
          {
            mask: "+7 (000) 000-00-00",
            placeholderChar: "\u00A0",
          },
        ]}
        dispatch={(appended, dynamicMasked) => {
          const digits = (dynamicMasked.value + appended)
            .replace(/\D/g, "")
            .replace(/^7/, "");

          if (digits.length === 0 || digits.length <= 3) {
            return dynamicMasked.compiledMasks[0];
          }

          if (digits.length <= 6) {
            return dynamicMasked.compiledMasks[1];
          }

          if (digits.length <= 8) {
            return dynamicMasked.compiledMasks[2];
          }

          return dynamicMasked.compiledMasks[3];
        }}
        onAccept={(value: string) => {
          onChange({
            target: {
              name: props.name,
              value,
            },
          });
        }}
        overwrite
      />
    );
  },
);

export type PhoneFieldProps = Omit<TextFieldProps, "onChange"> & {
  onChange?: (event: {
    target: {
      name?: string;
      value: string;
    };
  }) => void;
};

export default function PhoneField({
  value,
  onChange,
  error,
  helperText,
  slotProps,
  sx,
  ...rest
}: PhoneFieldProps) {
  const inputSlotProps =
    typeof slotProps?.input === "object" ? slotProps.input : {};

  return (
    <TextField
      {...rest}
      value={value}
      onChange={onChange as TextFieldProps["onChange"]}
      error={error}
      helperText={helperText}
      variant="standard"
      sx={{
        "& .MuiInputBase-input": {
          color: error ? "error.main" : "inherit",
        },
        ...sx,
      }}
      slotProps={{
        ...slotProps,
        input: {
          ...inputSlotProps,
          inputComponent:
            MaskedInput as unknown as React.ElementType<InputBaseComponentProps>,
        },
      }}
    />
  );
}
