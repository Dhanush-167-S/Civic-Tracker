import z from "zod";

export const loginSchema = z.object({
  email: z.email().describe("User Email"),
  password: z
    .string()
    .min(6, "Password should be atleast 6 characters")
    .describe("User password"),
});

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name should be atleast 2 characters")
    .describe("User name"),
  email: z.email().describe("User Email"),
  password: z
    .string()
    .min(6, "Password should be atleast 6 characters")
    .describe("User password"),
});
