import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";

interface ErrorMessageProps {
  title: string;
  errorMessage: string | undefined;
}

export function ErrorMessage(props: ErrorMessageProps) {
  const { title, errorMessage } = props;

  return (
    <Alert variant="destructive" className="max-w-md mx-auto my-auto">
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {errorMessage || "Произошла ошибка при загрузке данных"}
      </AlertDescription>
    </Alert>
  );
}
