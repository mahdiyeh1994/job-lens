import * as z from 'zod';

export const applicationSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  status: z.enum(['Applied', 'Interview', 'Offer', 'Rejected']),
  dateApplied: z.string().optional().nullable(),
  salary: z.string().optional().nullable(),
  location: z.enum(['Remote', 'On-site', 'Hybrid']),
  jobUrl: z
    .string()
    .trim()
    .url('Enter a valid URL')
    .or(z.literal(''))
    .optional(),
  nextStep: z.string().optional().nullable(),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;
