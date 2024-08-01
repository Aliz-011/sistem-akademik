'use server';

import { validateRequest } from '@/auth';
import { prisma } from '@/lib/database';
import { MajorFormValues, majorSchema } from '@/lib/validation';

export const createMajor = async (values: MajorFormValues) => {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const validatedFields = majorSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error('Invalid fields value.');
  }

  const body = validatedFields.data;

  const newFaculty = await prisma.major.create({
    data: {
      ...body,
    },
  });

  return newFaculty;
};
