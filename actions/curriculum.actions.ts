'use server';

import { validateRequest } from '@/auth';
import { prisma } from '@/lib/database';
import { CurriculumFormValues, curriculumSchema } from '@/lib/validation';
import { isRedirectError } from 'next/dist/client/components/redirect';

export const createCurriculum = async (values: CurriculumFormValues) => {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return {
        error: 'Unauthorized',
      };
    }

    const validatedFields = curriculumSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new Error('Invalid validation');
    }

    const body = validatedFields.data;

    const newCurriculum = await prisma.curriculum.create({
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
