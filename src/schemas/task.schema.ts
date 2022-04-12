import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().nonempty({
    message: "title is required",
  }),
  description: z.string().nonempty({
    message: "description is required",
  }),
});

export type createTaskType = z.infer<typeof createTaskSchema>;
