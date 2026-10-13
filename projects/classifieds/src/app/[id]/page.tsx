import { DetailsPage } from "@/_pages/details";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page(props: PageProps) {
  const { id } = await props.params;

  return <DetailsPage id={id} />;
}
