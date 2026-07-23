import { z } from 'zod';

export const settingsSchema = z.object({
  detectionThreshold: z
    .number({
      required_error: "Detection threshold is required",
      invalid_type_error: "Detection threshold must be a number",
    })
    .min(1, { message: "Detection threshold must be at least 1" })
    .max(100, { message: "Detection threshold cannot exceed 100" }),
  alertEmail: z
    .string({
      required_error: "Alert email is required",
    })
    .min(1, { message: "Alert email is required" })
    .email({ message: "Invalid email address" }),
  enableAutomaticBlocking: z.boolean().default(false),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
