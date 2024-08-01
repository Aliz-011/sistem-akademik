'use server';

import { hash } from '@node-rs/argon2';
import { generateIdFromEntropySize } from 'lucia';

import { prisma } from '@/lib/database';
import { StudentFormValues, studentSchema } from '@/lib/validation';

export const createStudent = async (values: StudentFormValues) => {
  const validatedFields = studentSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error('Invalid validation');
  }

  const { email, ...rest } = validatedFields.data;

  const existingNIM = await prisma.student.findUnique({
    where: {
      nim: rest.nim,
    },
  });

  if (existingNIM) {
    throw new Error('Mahasiswa dengan NIM sudah ada.');
  }

  const initialName = rest.fullName
    .split(' ')
    .map((n) => n[0])
    .join('');
  const password = `${initialName}${rest.nim}`;

  const hashedPassword = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const userId = generateIdFromEntropySize(10);

  await prisma.user.create({
    data: {
      id: userId,
      username: rest.nim,
      email,
      password: hashedPassword,
    },
  });

  const newStudent = await prisma.student.create({
    data: {
      ...rest,
      userId,
    },
  });

  return newStudent;
};
