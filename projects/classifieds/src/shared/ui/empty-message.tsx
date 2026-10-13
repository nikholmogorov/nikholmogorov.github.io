import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";

interface EmptyMessageProps {
  title: string;
  description: string;
}

export function EmptyMessage(props: EmptyMessageProps) {
  const { title, description } = props;

  return (
    <Alert className="max-w-md mx-auto my-auto">
      <InfoIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
