'use server';

import { validateRequest } from '@/auth';
import { prisma } from '@/lib/database';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';

export const createFaculty = async (name: string) => {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return {
        error: 'Unauthorized',
      };
    }

    const newFaculty = await prisma.faculty.create({
      data: {
        name,
      },
    });

    return {
      data: newFaculty,
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

export const updateFaculty = async (facultyId: string, name: string) => {
  try {
    const { user } = await validateRequest();

    if (!user) {
      throw new Error('Unauthorized');
    }

    const existingFaculty = await prisma.faculty.findFirst({
      where: {
        id: facultyId,
      },
    });

    if (!existingFaculty) {
      return {
        error: 'Data tidak ditemukan',
      };
    }

    const updatedFaculty = await prisma.faculty.update({
      where: {
        id: existingFaculty.id,
      },
      data: {
        name,
      },
    });

    revalidatePath(`/admin/faculties`);

    return {
      data: updatedFaculty,
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
