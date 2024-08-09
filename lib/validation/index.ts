import { z } from 'zod';
import { Sexes, SubjectType } from '@prisma/client';

export const registerSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email' }).min(1),
  username: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-zA-Z0-9_-]+$/, 'Only letters, numbers, - and _ are allowed'),
  password: z.string().trim().min(8),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().trim().min(1, {
    message: 'Please enter your password',
  }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const studentSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email' }).min(1),
  nim: z.string().min(8).trim(),
  fullName: z.string().min(1).trim(),
  birthDate: z.coerce.date(),
  sex: z.enum([Sexes.MALE, Sexes.FEMALE]),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^[0-9]+$/, 'Only numbers are allowed')
    .optional(),
  majorId: z.string(),
});

export type StudentFormValues = z.infer<typeof studentSchema>;

export const majorSchema = z.object({
  name: z.string().trim().min(3),
  facultyId: z.string().trim().min(1),
});

export type MajorFormValues = z.infer<typeof majorSchema>;

export const curriculumSchema = z.object({
  name: z.string().trim().min(3),
  year: z
    .string()
    .trim()
    .min(4)
    .regex(/^[0-9]+$/, 'Only numbers are allowed'),
  decisionDate: z.coerce.date(),
  approvedAt: z.coerce.date(),
  idealStudyPeriod: z.string().trim().min(1),
  maxStudyPeriod: z.string().trim().min(1),
  consentBy: z.string().trim().optional(),
  notes: z.string().optional(),
  majorId: z.string().min(1),
});

export type CurriculumFormValues = z.infer<typeof curriculumSchema>;

export const subjectSchema = z.object({
  name: z.string().trim().min(1),
  alias: z.string().trim().min(1),
  credit: z.number().gte(1),
  type: z.enum([
    SubjectType.REQUIRED,
    SubjectType.OPTIONAL,
    SubjectType.REQUIRED_INTEREST,
    SubjectType.THESIS,
  ]),
  semester: z
    .string()
    .trim()
    .min(1)
    .regex(/^[0-9]+$/, 'Only numbers are allowed'),
  majorId: z.string().min(1),
  lecturerId: z.string().min(1),
  curriculumId: z.string().min(1),
});

export type SubjectFormValues = z.infer<typeof subjectSchema>;
