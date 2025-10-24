import { z } from "zod";

export const consultationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  service: z.string().min(1, "Service type is required"),
  preferred_date: z.string(),
  preferred_time: z.string(),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;