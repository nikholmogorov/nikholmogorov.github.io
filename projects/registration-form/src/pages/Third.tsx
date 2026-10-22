import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import FormStepper from "../components/FormStepper";
import { thirdStepSchema } from "../formSchema";
import { type FormState, resetForm, setField } from "../store/formSlice";
import {
  useAppDispatch,
  useAppSelector,
  useStepValidation,
} from "../store/hooks";

const fieldSlotProps = {
  formHelperText: {
    sx: {
      position: "absolute",
      bottom: "-18px",
    },
  },
};

type SubmitResult = {
  success: boolean;
  message: string;
};

type TextFieldKey = Extract<keyof FormState, `textField${number}`>;

const allTextFields = [
  "textField1",
  "textField2",
  "textField3",
  "textField4",
  "textField5",
  "textField6",
  "textField7",
  "textField8",
  "textField9",
  "textField10",
] satisfies TextFieldKey[];

function getTextFieldNumber(field: TextFieldKey): number {
  return Number(field.replace("textField", ""));
}

function submitForm(form: FormState): Promise<SubmitResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Form data sent to API:", form);

      const success = Math.random() < 0.5;

      if (success) {
        resolve({
          success: true,
          message: "The data was successfully sent",
        });
      } else {
        resolve({
          success: false,
          message: "An error occurred while sending the data.",
        });
      }
    }, 3000);
  });
}

export default function Third() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.form);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  const [activeTextFields, setActiveTextFields] = useState<TextFieldKey[]>([
    "textField1",
    "textField2",
    "textField3",
  ]);

  const [nextTextFieldNumber, setNextTextFieldNumber] = useState(4);

  const validationSchema = useMemo(() => {
    const omittedFields = {} as Parameters<typeof thirdStepSchema.omit>[0];
    const activeTextFieldsSet = new Set(activeTextFields);

    allTextFields.forEach((field) => {
      if (!activeTextFieldsSet.has(field)) {
        omittedFields[field] = true;
      }
    });

    return thirdStepSchema.omit(omittedFields);
  }, [activeTextFields]);

  const { errors, handleNext, handleFieldChange, clearError } =
    useStepValidation(validationSchema, undefined, async () => {
      setIsSubmitting(true);

      try {
        const result = await submitForm(form);
        if (result.success) {
          dispatch(resetForm());
        }
        setSubmitResult(result);
      } finally {
        setIsSubmitting(false);
      }
    });

  const handleAddTextField = () => {
    if (nextTextFieldNumber > 10) {
      return;
    }

    const nextField = `textField${nextTextFieldNumber}` as TextFieldKey;

    setActiveTextFields((prev) => [...prev, nextField]);
    setNextTextFieldNumber((prev) => prev + 1);
  };

  const handleDeleteTextField = (field: TextFieldKey) => {
    setActiveTextFields((prev) =>
      prev.filter((currentField) => currentField !== field),
    );

    dispatch(
      setField({
        field,
        value: "",
      }),
    );

    clearError(field);
  };

  const handleModalClose = () => {
    const wasSuccessful = submitResult?.success ?? false;

    setSubmitResult(null);

    if (wasSuccessful) {
      navigate("/");
    }
  };

  return (
    <>
      <Stack
        sx={{
          minHeight: "100dvh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper sx={{ p: 4, width: 350 }}>
          <Stack spacing={2}>
            <FormStepper activeStep={2} />

            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Text fields</FormLabel>

              <Stack spacing={2}>
                {activeTextFields.map((field) => {
                  const fieldNumber = getTextFieldNumber(field);

                  return (
                    <Stack
                      key={field}
                      direction="row"
                      spacing={1}
                      sx={{
                        alignItems: "flex-start",
                      }}
                    >
                      <TextField
                        fullWidth
                        sx={{ position: "relative" }}
                        slotProps={fieldSlotProps}
                        id={`textfield-${fieldNumber}`}
                        label={`Text Field ${fieldNumber}`}
                        variant="standard"
                        value={form[field]}
                        onChange={handleFieldChange(field)}
                        error={Boolean(errors[field])}
                        helperText={errors[field] || ""}
                      />

                      <IconButton
                        aria-label={`Delete Text Field ${fieldNumber}`}
                        onClick={() => handleDeleteTextField(field)}
                        disabled={isSubmitting}
                        sx={{
                          mt: 1,
                          width: 48,
                          height: 48,
                        }}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </Stack>
                  );
                })}

                <Button
                  onClick={handleAddTextField}
                  disabled={isSubmitting || nextTextFieldNumber > 10}
                >
                  ADD
                </Button>
              </Stack>
            </FormControl>

            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Checkboxes</FormLabel>

              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.checkbox1}
                      onChange={handleFieldChange("checkbox1")}
                    />
                  }
                  label="First"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.checkbox2}
                      onChange={handleFieldChange("checkbox2")}
                    />
                  }
                  label="Second"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.checkbox3}
                      onChange={handleFieldChange("checkbox3")}
                    />
                  }
                  label="Third"
                />
              </FormGroup>
            </FormControl>

            <FormControl
              component="fieldset"
              variant="standard"
              error={Boolean(errors.radioValue)}
              sx={{ position: "relative" }}
            >
              <FormLabel component="legend">Radio group</FormLabel>

              <RadioGroup
                value={form.radioValue}
                onChange={handleFieldChange("radioValue")}
              >
                <FormControlLabel
                  value="radio-1"
                  control={<Radio />}
                  label="First"
                />

                <FormControlLabel
                  value="radio-2"
                  control={<Radio />}
                  label="Second"
                />

                <FormControlLabel
                  value="radio-3"
                  control={<Radio />}
                  label="Third"
                />
              </RadioGroup>

              {errors.radioValue && (
                <FormHelperText
                  sx={{
                    position: "absolute",
                    bottom: "-18px",
                  }}
                >
                  {errors.radioValue}
                </FormHelperText>
              )}
            </FormControl>

            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={() => navigate("/second")}
                disabled={isSubmitting}
              >
                Back
              </Button>

              <Button onClick={handleNext} disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={20} /> : "Send"}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Stack>

      <Dialog open={submitResult !== null} onClose={handleModalClose}>
        <DialogTitle>{submitResult?.success ? "Success" : "Error"}</DialogTitle>

        <DialogContent>{submitResult?.message}</DialogContent>

        <DialogActions>
          <Button onClick={handleModalClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
