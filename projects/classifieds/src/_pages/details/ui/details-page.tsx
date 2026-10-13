import { ItemDetails } from "@/widgets/item-details";

interface DetailsPageProps {
  id: string;
}

export function DetailsPage(props: DetailsPageProps) {
  const { id } = props;

  return <ItemDetails id={id} />;
}
