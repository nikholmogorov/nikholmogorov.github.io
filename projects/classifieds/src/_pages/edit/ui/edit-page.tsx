import { ItemEdit } from "@/widgets/item-edit";

interface EditPageProps {
  id: string;
}

export function EditPage(props: EditPageProps) {
  const { id } = props;

  return <ItemEdit id={id} />;
}
