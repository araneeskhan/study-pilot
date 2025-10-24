import { z } from "zod";

export const countrySchema = z.object({
  name: z.string().min(2, "Country name is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  education_system: z.string().min(50, "Education system description is required"),
  tuition_fees: z.object({
    bachelor: z.object({
      min: z.number().min(0),
      max: z.number().min(0),
      currency: z.string(),
    }),
    master: z.object({
      min: z.number().min(0),
      max: z.number().min(0),
      currency: z.string(),
    }),
    phd: z.object({
      min: z.number().min(0),
      max: z.number().min(0),
      currency: z.string(),
    }),
  }),
  language_requirements: z.array(
    z.object({
      test: z.string(),
      min_score: z.number().min(0),
    })
  ),
  visa_info: z.string().min(50, "Visa information is required"),
  part_time_work: z.boolean(),
  post_study_work_visa: z.boolean(),
  popular_cities: z.array(z.string()).min(1, "At least one city is required"),
  cost_of_living: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
    currency: z.string(),
  }),
  featured: z.boolean().default(false),
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export type CountryFormData = z.infer<typeof countrySchema>;