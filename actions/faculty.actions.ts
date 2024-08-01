'use server';

import { validateRequest } from '@/auth';
import { prisma } from '@/lib/database';

export const createFaculty = async (name: string) => {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const newFaculty = await prisma.faculty.create({
    data: {
      name,
    },
  });

  return newFaculty;
};
