import { cn } from "@/utils/shadcnUtils";
import { ComponentProps } from "react";

type JobListingGridProps = ComponentProps<"div">;
export function JobListingGrid({ className, ...props }: JobListingGridProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col md:grid gap-4 grid-cols-[repeat(autofill, minmax(400px, 1fr))]",
        className
      )}
    ></div>
  );
}
