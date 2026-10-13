import { EditPage } from "@/_pages/edit";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page(props: PageProps) {
  const { id } = await props.params;

  return <EditPage id={id} />;
}
