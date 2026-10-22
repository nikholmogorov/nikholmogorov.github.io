import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormStepper from "../components/FormStepper";
import PhoneField from "../components/PhoneField";
import { firstStepSchema } from "../formSchema";
import { useAppSelector, useStepValidation } from "../store/hooks";

const fieldSlotProps = {
  formHelperText: {
    sx: {
      position: "absolute",
      bottom: "-18px",
    },
  },
};

export default function First() {
  const form = useAppSelector((state) => state.form);

  const { errors, handleNext, handleFieldChange } = useStepValidation(
    firstStepSchema,
    "/second",
  );

  return (
    <Stack
      sx={{
        minHeight: "100dvh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ p: 4, width: 350 }}>
        <Stack spacing={2}>
          <FormStepper activeStep={0} />

          <TextField
            sx={{ position: "relative" }}
            slotProps={fieldSlotProps}
            value={form.firstName}
            onChange={handleFieldChange("firstName")}
            id="first-name"
            label="First Name"
            variant="standard"
            error={Boolean(errors.firstName)}
            helperText={errors.firstName || ""}
          />

          <TextField
            sx={{ position: "relative" }}
            slotProps={fieldSlotProps}
            value={form.lastName}
            onChange={handleFieldChange("lastName")}
            id="last-name"
            label="Last Name"
            variant="standard"
            error={Boolean(errors.lastName)}
            helperText={errors.lastName || ""}
          />

          <TextField
            sx={{ position: "relative" }}
            slotProps={fieldSlotProps}
            value={form.email}
            onChange={handleFieldChange("email")}
            id="email"
            label="Email"
            variant="standard"
            error={Boolean(errors.email)}
            helperText={errors.email || ""}
          />

          <PhoneField
            sx={{ position: "relative" }}
            slotProps={fieldSlotProps}
            value={form.phone}
            onChange={handleFieldChange("phone")}
            id="phone"
            label="Phone"
            variant="standard"
            error={Boolean(errors.phone)}
            helperText={errors.phone || ""}
          />

          <TextField
            sx={{ position: "relative" }}
            slotProps={fieldSlotProps}
            value={form.github}
            onChange={handleFieldChange("github")}
            id="github"
            label="GitHub"
            variant="standard"
            error={Boolean(errors.github)}
            helperText={errors.github || ""}
          />

          <TextField
            sx={{ position: "relative" }}
            slotProps={fieldSlotProps}
            value={form.cv}
            onChange={handleFieldChange("cv")}
            id="cv"
            label="CV"
            variant="standard"
            error={Boolean(errors.cv)}
            helperText={errors.cv || ""}
          />

          <TextField
            sx={{ position: "relative" }}
            slotProps={fieldSlotProps}
            value={form.telegram}
            onChange={handleFieldChange("telegram")}
            id="telegram"
            label="Telegram"
            variant="standard"
            error={Boolean(errors.telegram)}
            helperText={errors.telegram || ""}
          />

          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={handleNext}>Next</Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
