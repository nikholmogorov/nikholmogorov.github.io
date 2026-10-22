import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
import FormStepper from "../components/FormStepper";
import { secondStepSchema } from "../formSchema";
import { useAppSelector, useStepValidation } from "../store/hooks";

const fieldSlotProps = {
  formHelperText: {
    sx: {
      position: "absolute",
      bottom: "-18px",
    },
  },
};

export default function Second() {
  const navigate = useNavigate();
  const form = useAppSelector((state) => state.form);

  const { errors, handleNext, handleFieldChange } = useStepValidation(
    secondStepSchema,
    "/third",
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
          <FormStepper activeStep={1} />

          <TextField
            sx={{ position: "relative" }}
            slotProps={fieldSlotProps}
            value={form.speciality}
            onChange={handleFieldChange("speciality")}
            id="speciality"
            label="Speciality"
            variant="standard"
            error={Boolean(errors.speciality)}
            helperText={errors.speciality || ""}
          />

          <TextField
            sx={{ position: "relative" }}
            slotProps={fieldSlotProps}
            value={form.stack}
            onChange={handleFieldChange("stack")}
            id="stack"
            label="Stack"
            variant="standard"
            error={Boolean(errors.stack)}
            helperText={errors.stack || ""}
          />

          <FormControl
            variant="standard"
            fullWidth
            error={Boolean(errors.grade)}
            sx={{ position: "relative" }}
          >
            <InputLabel id="grade-label">Grade</InputLabel>

            <Select
              labelId="grade-label"
              id="grade"
              name="grade"
              value={form.grade}
              onChange={handleFieldChange("grade")}
            >
              <MenuItem value="junior">Junior</MenuItem>
              <MenuItem value="middle">Middle</MenuItem>
              <MenuItem value="senior">Senior</MenuItem>
            </Select>

            <FormHelperText
              sx={{
                position: "absolute",
                bottom: "-18px",
              }}
            >
              {errors.grade || ""}
            </FormHelperText>
          </FormControl>

          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={() => navigate("/")}>Back</Button>

            <Button onClick={handleNext}>Next</Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
