'use server';

import { validateRequest } from '@/auth';
import { prisma } from '@/lib/database';
import { MajorFormValues, majorSchema } from '@/lib/validation';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';

export const createMajor = async (values: MajorFormValues) => {
  try {
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

    return { data: newFaculty };
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

export const updateMajor = async (majorId: string, values: MajorFormValues) => {
  try {
    const { user } = await validateRequest();

    if (!user) {
      throw new Error('Unauthorized');
    }

    const validatedFields = majorSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new Error('Invalid fields value.');
    }

    const body = validatedFields.data;

    const existingMajor = await prisma.major.findFirst({
      where: {
        id: majorId,
      },
    });

    if (!existingMajor) {
      return {
        error: 'Data tidak ditemukan',
      };
    }

    const updatedMajor = await prisma.major.update({
      where: {
        id: existingMajor.id,
      },
      data: {
        ...body,
      },
    });

    revalidatePath('/admin/majors');

    return {
      data: updatedMajor,
    };
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
