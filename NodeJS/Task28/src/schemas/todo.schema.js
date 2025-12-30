import z from "zod";

export const todo = new z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  isCompleted: z.boolean().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

