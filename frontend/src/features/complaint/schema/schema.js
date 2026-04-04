import z from "zod";

export const complaintSchema = z.object({
  title: z
    .string()
    .min(4, "Title should be atleast 4 characters long")
    .describe("Complaint Title"),
  description: z
    .string()
    .min(20, "Description should be atleast 20 characters long")
    .describe("Complaint description"),
  location: z
    .string()
    .min(10, "Location should be atleast 10 characters long")
    .describe("Complaint location"),
  image: z
    .any()
    .refine((files) => files?.length === 1, "Image is required")
    .refine(
      (files) => files?.[0]?.type?.startsWith("image/"),
      "Only image files are allowed",
    ),
});
