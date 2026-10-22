import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { ZodSchema } from "zod";
import { type FormState, type SetFieldPayload, setField } from "./formSlice";
import type { AppDispatch, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

type FormChangeEvent = {
  target: {
    type?: string;
    checked?: boolean;
    value: FormState[keyof FormState];
  };
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

export function useStepValidation(
  schema: ZodSchema,
  nextRoute?: string,
  onSuccess?: () => void,
) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.form);
  const [errors, setErrors] = useState<FieldErrors>({});

  const clearError = (field: keyof FormState) => {
    setErrors((prevErrors) => {
      if (!prevErrors[field]) {
        return prevErrors;
      }

      const newErrors = { ...prevErrors };
      delete newErrors[field];

      return newErrors;
    });
  };

  const handleFieldChange =
    (field: keyof FormState) => (e: FormChangeEvent) => {
      const target = e.target;

      const value =
        target.type === "checkbox" ? Boolean(target.checked) : target.value;

      dispatch(setField({ field, value } as SetFieldPayload));
      clearError(field);
    };

  const handleNext = () => {
    const result = schema.safeParse(form);

    if (!result.success) {
      const fieldErrors: FieldErrors = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];

        if (
          typeof fieldName === "string" &&
          fieldName in form &&
          !fieldErrors[fieldName as keyof FormState]
        ) {
          fieldErrors[fieldName as keyof FormState] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSuccess?.();

    if (nextRoute) {
      navigate(nextRoute);
    }
  };

  return {
    errors,
    handleNext,
    handleFieldChange,
    clearError,
  };
}
