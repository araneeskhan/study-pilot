import { z } from "zod";

// Admin Signup Schema - Hidden route for initial admin creation
export const adminSignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  adminSecret: z.string().min(1, "Admin secret is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type AdminSignupFormData = z.infer<typeof adminSignupSchema>;