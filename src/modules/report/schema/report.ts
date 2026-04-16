import z from "zod";

const typeEnum = z.enum(["bug", "feature"], {
  error: "Please select a report type.",
});

export const reportSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(100, "Title must be under 100 characters."),
  type: typeEnum,
  message: z
    .string()
    .min(20, "Message must be at least 20 characters.")
    .max(2000, "Message must be under 2000 characters."),
});
