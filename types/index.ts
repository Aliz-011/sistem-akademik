import { Session, User } from '@prisma/client';

export type UserData = Omit<User, 'createdAt'> & {
  createdAt: string;
};
