'use server';

import { isRedirectError } from 'next/dist/client/components/redirect';

import { validateRequest } from '@/auth';
import { prisma } from '@/lib/database';
import { SubjectFormValues, subjectSchema } from '@/lib/validation';

export const createSubject = async (values: SubjectFormValues) => {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return {
        error: 'Unauthorized',
      };
    }

    const validatedFields = subjectSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new Error('Invalid validation');
    }

    const body = validatedFields.data;

    const newCurriculum = await prisma.subject.create({
      data: {
        ...body,
      },
    });

    return { data: newCurriculum };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.error(error);
    return {
      error: 'Something went wrong. Please try again',
    };
  }
};
