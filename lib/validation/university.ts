import { z } from "zod";

export const universitySchema = z.object({
  name: z.string().min(2, "University name is required"),
  country: z.string().min(1, "Country is required"),
  type: z.enum(["public", "private"]),
  ranking: z.object({
    world: z.number().min(0).optional(),
    national: z.number().min(0).optional(),
  }),
  website: z.string().url("Invalid URL"),
  location: z.object({
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Address is required"),
  }),
  description: z.string().min(100, "Description must be at least 100 characters"),
  founded_year: z.number().min(1000).max(new Date().getFullYear()),
  tuition_fees: z.array(
    z.object({
      degree_level: z.string(),
      fee: z.number().min(0),
      currency: z.string(),
    })
  ),
  admission_requirements: z.object({
    min_gpa: z.number().min(0).max(4),
    language_tests: z.array(
      z.object({
        test: z.string(),
        min_score: z.number().min(0),
      })
    ),
    documents: z.array(z.string()),
  }),
  application_deadlines: z.array(
    z.object({
      intake: z.string(),
      deadline: z.string(),
    })
  ),
  featured: z.boolean().default(false),
  accreditations: z.array(z.string()),
  facilities: z.array(z.string()),
  contact: z.object({
    email: z.string().email(),
    phone: z.string(),
  }),
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export type UniversityFormData = z.infer<typeof universitySchema>;