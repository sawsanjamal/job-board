import {
  JOB_LISTING_EXPERIENCE_LEVELS,
  JOB_LISTING_TYPES,
} from "@backend/constants/types";
import { z } from "zod";

export const jobListingSchema = z.object({
  id: z.string(),
  title: z.string(),
  companyName: z.string(),
  location: z.string(),
  applyUrl: z.string().url(),
  type: z.enum(JOB_LISTING_TYPES),
  salary: z.number(),
  experienceLevel: z.enum(JOB_LISTING_EXPERIENCE_LEVELS),
  shortDescription: z.string(),
  description: z.string(),
  expiresAt: z.nullable(z.coerce.date()),
});
