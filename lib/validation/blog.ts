import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  excerpt: z.string().min(50, "Excerpt must be at least 50 characters"),
  content: z.string().min(200, "Content must be at least 200 characters"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  published: z.boolean().default(false),
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export type BlogFormData = z.infer<typeof blogSchema>;