import { PrivatePage } from "@/components/routing/PrivatePage";
import { EditJobListingPage } from "./Page";
import { loader } from "./loader";

export const editJobListingsRoute = {
  loader,
  element: (
    <PrivatePage>
      <EditJobListingPage />
    </PrivatePage>
  ),
};
