'use server';

import { hash, verify } from '@node-rs/argon2';
import { generateIdFromEntropySize } from 'lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect';

import {
  LoginFormValues,
  loginSchema,
  RegisterFormValues,
  registerSchema,
} from '@/lib/validation';
import { prisma } from '@/lib/database';
import { lucia, validateRequest } from '@/auth';
import { UserData } from '@/types';

export const register = async (values: RegisterFormValues) => {
  try {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: 'Invalid validation',
      };
    }

    const { password, username, email } = validatedFields.data;

    const hashedPassword = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    const existingUsername = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });

    if (existingUsername) {
      return {
        error: 'username already taken',
      };
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });

    if (existingEmail) {
      return {
        error: 'Email already taken',
      };
    }

    await prisma.user.create({
      data: {
        id: userId,
        username,
        email,
        password: hashedPassword,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect('/');
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

export const login = async (values: LoginFormValues) => {
  try {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: 'Invalid validation',
      };
    }

    const { password, username } = validatedFields.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });

    if (!existingUser) {
      return {
        error: 'Incorrect username or password',
      };
    }

    console.log(existingUser);

    const user: UserData = {
      ...existingUser,
      createdAt: existingUser.createdAt.toISOString(),
    };

    const isMatch = await verify(user.password, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!isMatch) {
      return {
        error: 'Incorrect username or password',
      };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect('/');
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.log(error);

    console.error(error);
    return {
      error: 'Something went wrong. Please try again',
    };
  }
};

export const logout = async () => {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};
