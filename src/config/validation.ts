import { z } from 'zod';

// Form validation schemas
export const ContactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters'),

  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must not exceed 5000 characters'),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

// Validation function with error handling
export const validateContactForm = (data: unknown) => {
  try {
    return ContactFormSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: true,
        message: error.errors[0]?.message || 'Validation failed',
        field: error.errors[0]?.path[0],
      };
    }
    return {
      error: true,
      message: 'An unexpected error occurred',
    };
  }
};
