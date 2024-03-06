import { PageHeader } from "@/components/ui/PageHeader";
import { createJobListing } from "@/features/job-listing";
import { JobListingForm } from "@/features/job-listing";
import { useNavigate } from "react-router-dom";

export function NewJobListingsPage() {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader>New Listings</PageHeader>
      <JobListingForm
        onSubmit={async (value) => {
          await createJobListing(value);
          navigate("jobs/my-listings");
        }}
      />
    </>
  );
}
