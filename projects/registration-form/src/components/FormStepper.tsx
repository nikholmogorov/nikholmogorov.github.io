import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

const steps = ["1", "2", "3"];

interface FormStepperProps {
  activeStep: number;
}

export default function FormStepper(props: FormStepperProps) {
  const { activeStep } = props;

  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel></StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
