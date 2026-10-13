import { Suspense } from "react";
import { ListPage } from "@/_pages/list";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ListPage />
    </Suspense>
  );
}
